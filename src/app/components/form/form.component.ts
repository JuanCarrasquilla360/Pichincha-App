import { MatGridListModule } from '@angular/material/grid-list';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AsyncValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatNativeDateModule } from '@angular/material/core';
import { editProduct, getProducts, sendProduct, validateProduct } from '../../services/product.service';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { ProductsModel } from '../../models/products.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatNativeDateModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  minDate = new Date();
  dataFromStorage: ProductsModel[] = []
  productForm = new FormGroup({
    id: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ],
      asyncValidators: [this.createValidator(validateProduct)]
    }),
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]
    }),
    description: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]
    }),
    logo: new FormControl('', Validators.required),
    date_release: new FormControl<Date | null>(null, {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]
    }),
    date_revision: new FormControl<Date | null>({ value: null, disabled: true }, {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]
    }),
  });

  columnas = 2;
  id: any

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private snackBar: MatSnackBar
  ) {
    this.breakpointObserver
      .observe(['(max-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.columnas = 1;
        }
        else {
          this.columnas = 2;
        }
      });
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) return
    this.productForm.get("id")?.disable()
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('products')) {
        this.dataFromStorage = JSON.parse(localStorage.getItem('products') || "");
        if (this.dataFromStorage.length === 0) return
        const productFromStorage = this.dataFromStorage.find((val) => val.id === this.id)
        if (!productFromStorage) {
          this.snackBar.open("Producto con ese ID no encontrado", undefined, {
            verticalPosition: "bottom", duration: 2000
          })
          return
        }
        // @ts-ignore
        this.productForm.setValue(productFromStorage)
      } else {
        getProducts().then(data => {
          this.dataFromStorage = data
          if (this.dataFromStorage.length === 0) return
          const productFromStorage = this.dataFromStorage.find((val) => val.id === this.id)
          if (!productFromStorage) {
            this.snackBar.open("Producto con ese ID no encontrado", undefined, {
              verticalPosition: "bottom", duration: 2000
            })
            return
          }
          // @ts-ignore
          this.productForm.setValue(productFromStorage)
        })
      }
    }
  }

  createValidator(service: typeof validateProduct): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {

      return service(control.value).then((available: boolean) => {
        if (available) {
          return { idUnavailable: true };
        }
        else {
          return null;
        }

      }
      );
    };
  }

  onSubmit() {
    if (this.productForm.invalid) return
    if (this.id) {
      editProduct({ ...this.productForm.getRawValue() }).then((res) => {
        this.snackBar.open("Producto editado exitosamente", undefined, {
          verticalPosition: "bottom", duration: 2000
        })
        const index = this.dataFromStorage.findIndex(p => p.id === res.id)
        this.dataFromStorage[index] = { ...this.dataFromStorage[index], ...res }
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('products', JSON.stringify(this.dataFromStorage));
        }
      })
      return
    }
    sendProduct({ ...this.productForm.getRawValue() }).then(() => {
      this.snackBar.open("Producto creado exitosamente", undefined, {
        duration: 2000, verticalPosition: "bottom"
      })
    })
  }
  changeTest(e: Date) {
    const releaseDate = moment(e)
    this.productForm.patchValue({ date_revision: (releaseDate.add(1, 'year')).toDate() })
  }

  resetForm() {
    this.productForm.reset({ id: this.id ? this.id : "" })
  }
}
