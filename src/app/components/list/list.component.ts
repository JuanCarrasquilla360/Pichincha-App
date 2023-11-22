import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import moment from 'moment';
import { deleteProduct, getProducts } from '../../services/product.service';
import { ProductsModel } from '../../models/products.model';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = ['logo', 'name', 'description', 'date_release', 'date_revision', "actions"];
  dataSource = new MatTableDataSource<ProductsModel>([]);
  rowsData: ProductsModel[] = []
  isLoading: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.isLoading = true
    getProducts().then(data => {
      this.rowsData = this.formattedData(data)
      this.dataSource = new MatTableDataSource<ProductsModel>(this.rowsData);
      this.isLoading = false
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('products', JSON.stringify(data));
      }
    })
  }

  navigateToAdd() {
    this.router.navigate(['/agregar-producto']);
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 250);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formattedData(arr: ProductsModel[]) {
    return arr.map(data => ({
      ...data,
      date_release: moment(data.date_release).format('MM/DD/YYYY'),
      date_revision: moment(data.date_revision).format('MM/DD/YYYY')
    }))
  }
  deleteProduct(e: any) {
    this.openConfirmDialog(e.name).afterClosed().subscribe(res => {     
      if (res) {
        deleteProduct(e.id).then(()=>{
          this.dataSource.data = this.dataSource.data.filter(p => p !== e)
          this.dataSource._updateChangeSubscription();  
          this.snackBar.open("Producto eliminado exitosamente", undefined, {
            duration: 2000, verticalPosition: "bottom"
          })
        })
      }
    });

  }
  editProduct(e: any) {
    this.router.navigate([`/agregar-producto/${e.id}`]);
  }

  openConfirmDialog(productName: string) {
    return this.dialog.open(DialogComponent, { width: "450px", data: {productName} })
  }


}
