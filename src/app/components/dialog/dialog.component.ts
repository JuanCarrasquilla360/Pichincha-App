import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatDividerModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
