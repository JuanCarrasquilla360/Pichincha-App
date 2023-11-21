import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import moment from 'moment';
import { getProducts } from '../../services/product.service';

export interface ProductsModel {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

const ELEMENT_DATA: ProductsModel[] = [
  {
    "id": "cmp-01",
    "name": "Visa ConnectMiles BancoGeneral",
    "description": "Acumula mas millas",
    "logo": "https://www.copaair.com/assets/Banco-General-Platinum.png",
    "date_release": "2023-11-27T00:00:00.000+00:00",
    "date_revision": "2024-11-27T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-02",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-03",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-04",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-05",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-06",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-07",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-08",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-09",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-10",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-11",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-12",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-13",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  },
  {
    "id": "trj-mnd-14",
    "name": "Visa Mileage",
    "description": "acumula millas y viaja por el mundo",
    "logo": "https://www.copaair.com/assets/Banco-General-Signature.png",
    "date_release": "2023-06-07T00:00:00.000+00:00",
    "date_revision": "2024-06-07T00:00:00.000+00:00"
  }
];

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, MatGridListModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = ['logo', 'name', 'description', 'date_release', 'date_revision'];
  dataSource = new MatTableDataSource<ProductsModel>(this.formattedData(ELEMENT_DATA));

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(){
    getProducts().then(data => console.log(data))
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

}
