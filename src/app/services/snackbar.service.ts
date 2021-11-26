import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBarSuccess(mensaje: string, action: string){
    this.snackBar.open(mensaje, action, {
      duration: 4000,
      panelClass: ['blue-snackbar']
    });
  }

  openSnackBarError(mensaje: string, action: string){
    this.snackBar.open(mensaje, action, {
      duration: 4000,
      panelClass: ['error-snackbar']
    });
  }

}
