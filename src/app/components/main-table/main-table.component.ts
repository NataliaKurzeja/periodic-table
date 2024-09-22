import { Component, effect, inject, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PeriodicElementsStore } from '../../store/periodic-elements.store';
import { PeriodicElement } from '../../shared/interfaces/periodic-element.interface';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { EditTableDataComponent } from '../edit-table-data/edit-table-data.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-main-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.scss',
})
export class MainTableComponent {
  @ViewChild(MatSort) sort!: MatSort;

  dialog = inject(MatDialog);
  periodicElementsStore = inject(PeriodicElementsStore);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
  tableData = new MatTableDataSource<PeriodicElement>();
  filterControl = new FormControl('');

  constructor() {
    effect(() => {
      this.tableData.data = this.periodicElementsStore.model();
    });
  }

  ngOnInit() {
    this.periodicElementsStore.loadData();

    this.filterControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((filterValue) => {
        this.tableData.filter = filterValue
          ? filterValue.trim().toLowerCase()
          : '';
      });
  }

  ngAfterViewInit() {
    this.tableData.sort = this.sort;
  }

  editData(data: PeriodicElement) {
    const dialogRef = this.dialog.open(EditTableDataComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.periodicElementsStore.editData(result);
    });
  }
}
