import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
@Component({
  selector: 'app-bookings',
  standalone: false,
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings implements OnInit {
  vehicles: any[] = [];
  bookings: any[] = [];
  allSlots: any[] = [];
  availableSlots: any[] = [];
  availableVehicles: any[] = [];
  editVehicle: any = null;

  bookingData: any = {
    vehicle: '',
    slot: '',
    inTime: '',
    outTime: '',
    duration: '',
    charges: 0,
  };

  minDateTime: string = '';
  timeError: string = '';

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.loadBookings();
    this.loadSlots();
    this.setMinDateTime();
  }

  setMinDateTime() {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  loadVehicles() {
    this.api.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = Array.isArray(data) ? data : [];
        this.filterAvailableVehicles();
      },
      error: (err) => console.error('Error loading vehicles', err),
    });
  }

  loadBookings() {
    this.api.getBookings().subscribe({
      next: (data) => {
        this.bookings = Array.isArray(data) ? data : [];
        this.filterAvailableSlots();
        this.filterAvailableVehicles();
      },
      error: (err) => console.error('Error loading bookings:', err),
    });
  }

  loadSlots() {
    this.api.getSlots().subscribe({
      next: (data) => {
        this.allSlots = Array.isArray(data) ? data : [];
        this.filterAvailableSlots();
      },
      error: (err) => console.error('Error loading slots:', err),
    });
  }

  filterAvailableSlots() {
    const bookedSlots = this.bookings.map((b: any) => b.slotNumber || b.slot);
    this.availableSlots = this.allSlots.filter(
      (slot: any) => !bookedSlots.includes(slot.slotNumber)
    );
  }

  filterAvailableVehicles() {
    const bookedVehicleNumbers = this.bookings.map((b: any) => b.vehicleNumber);
    this.availableVehicles = this.vehicles.filter(
      (v: any) => !bookedVehicleNumbers.includes(v.vehicleNumber)
    );
  }

  calculateDurationAndCharges(): void {
    this.timeError = '';

    if (this.bookingData.inTime && this.bookingData.outTime) {
      const entry = new Date(this.bookingData.inTime);
      const exit = new Date(this.bookingData.outTime);
      const now = new Date();

      if (entry < now) {
        this.timeError = 'Entry time cannot be in the past.';
        this.bookingData.duration = 'Invalid';
        this.bookingData.charges = 0;
        return;
      }

      if (exit <= entry) {
        this.timeError = 'Exit time must be after entry time.';
        this.bookingData.duration = 'Invalid';
        this.bookingData.charges = 0;
        return;
      }

      const diffMs = exit.getTime() - entry.getTime();
      const diffHrs = diffMs / (1000 * 60 * 60);
      this.bookingData.duration = diffHrs.toFixed(2) + ' hrs';
      const ratePerHour = 50;
      this.bookingData.charges = Math.ceil(diffHrs * ratePerHour);
    }
  }

  onSubmit() {
    this.calculateDurationAndCharges();

    if (this.timeError) {
      alert(this.timeError);
      return;
    }

    if (!this.bookingData.vehicle || !this.bookingData.slot) {
      alert('Please select both vehicle and slot');
      return;
    }

    const selectedVehicle = this.vehicles.find((v) => v._id === this.bookingData.vehicle);
    const selectedSlot = this.allSlots.find((s) => s._id === this.bookingData.slot);

    if (!selectedVehicle || !selectedSlot) {
      alert('Invalid vehicle or slot selection.');
      return;
    }

    const validVehicleNumber = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    if (!validVehicleNumber.test(selectedVehicle.vehicleNumber)) {
      alert('Invalid vehicle number format (e.g., GJ01AB1234).');
      return;
    }

    const bookingPayload = {
      vehicleNumber: selectedVehicle.vehicleNumber,
      ownerName: selectedVehicle.ownerName,
      slotNumber: selectedSlot.slotNumber,
      entryTime: this.bookingData.inTime,
      exitTime: this.bookingData.outTime,
      duration: this.bookingData.duration,
      charges: this.bookingData.charges,
    };

    this.api.addBooking(bookingPayload).subscribe({
      next: () => {
        alert('Booking created successfully!');
        this.loadBookings();
        this.loadSlots();
        this.loadVehicles();
        this.bookingData = {
          vehicle: '',
          slot: '',
          inTime: '',
          outTime: '',
          duration: '',
          charges: 0,
        };
        this.timeError = '';
      },
      error: (err) => console.error('Error adding booking:', err),
    });
  }

  deleteBooking(bookingId: string) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.api.deleteBooking(bookingId).subscribe({
        next: () => {
          alert('Booking deleted successfully!');
          this.loadBookings();
          this.loadSlots();
          this.loadVehicles();
        },
        error: (err) => {
          console.error('Error deleting booking:', err);
          alert('Failed to delete booking.');
        },
      });
    }
  }
}
