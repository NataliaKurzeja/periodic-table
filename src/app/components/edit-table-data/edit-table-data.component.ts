import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../shared/interfaces/periodic-element.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-table-data',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-table-data.component.html',
  styleUrl: './edit-table-data.component.scss',
})
export class EditTableDataComponent {
  data = signal<PeriodicElement>(inject(MAT_DIALOG_DATA));
  editDataForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editDataForm = this.fb.group({
      position: [null, Validators.required],
      name: ['', Validators.required],
      weight: [null, Validators.required],
      symbol: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.editDataForm.patchValue({
      position: this.data().position,
      name: this.data().name,
      weight: this.data().weight,
      symbol: this.data().symbol,
    });
  }
}
