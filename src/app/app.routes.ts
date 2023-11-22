import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'agregar-producto', component: FormComponent },
    { path: 'agregar-producto/:id', component: FormComponent }
];
