import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicles',
  standalone: false,
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css',
})
export class Vehicles {
  vehicles: any[] = [];
  newVehicle = {
    vehicleNumber: '',
    ownerName: '',
    vehicleType: '',
    slotNumber: '',
  };

  constructor(private api: Api, private snack: MatSnackBar) {}

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.api.getVehicles().subscribe({
      next: (res) => (this.vehicles = res),
      error: (err) => console.error(err),
    });
  }

  addVehicle() {
    if (
      !this.newVehicle.vehicleNumber ||
      !this.newVehicle.ownerName ||
      !this.newVehicle.vehicleType
    ) {
      alert('Please fill all required fields!');
      return;
    }

    this.api.addVehicle(this.newVehicle).subscribe({
      next: () => {
        alert('Vehicle added successfully!');
        this.snack.open('Vehicle added successfully!', 'OK', {
          duration: 3000,
          panelClass: ['toast-snackbar', 'toast-position-bottom-right'],
        });
        this.loadVehicles();
        this.newVehicle = { vehicleNumber: '', ownerName: '', vehicleType: '', slotNumber: '' };
      },
      error: (err) => console.error(err),
    });
  }

  deleteVehicle(id: string) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.api.deleteVehicle(id).subscribe({
        next: () => {
          alert('Vehicle deleted!');
          this.snack.open('Vehicle deleted successfully!', 'OK', {
            duration: 3000,
            panelClass: ['toast-snackbar', 'toast-position-bottom-right'],
          });
          this.loadVehicles();
        },
        error: (err) => console.error(err),
      });
    }
  }
}
