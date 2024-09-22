import { Routes } from '@angular/router';
import { MainTableComponent } from './components/main-table/main-table.component';

export const routes: Routes = [
  { path: 'main-table', component: MainTableComponent },
  { path: '', redirectTo: '/main-table', pathMatch: 'full' },
  { path: '**', redirectTo: '/main-table' },
];
