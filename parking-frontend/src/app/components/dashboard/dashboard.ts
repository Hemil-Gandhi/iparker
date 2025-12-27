import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  dashboardCards = [
    { title: 'Total Parking Lots', count: 0 },
    { title: 'Vehicles Parked', count: 0 },
    { title: 'Bookings Today', count: 0 },
    { title: 'Available Slots', count: 0 },
  ];

  bookings: any[] = [];
  totalSlots = 50;

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.api.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.updateDashboardCounts();
      },
      error: (err) => console.error('Error loading bookings:', err),
    });
  }

  updateDashboardCounts() {
    const today = new Date().toDateString();
    const bookingsToday = this.bookings.filter(
      (b: any) => new Date(b.entryTime).toDateString() === today
    ).length;

    const bookedSlots = this.bookings.length;
    const availableSlots = this.totalSlots - bookedSlots;

    this.dashboardCards = [
      { title: 'Total Parking Lots', count: this.totalSlots },
      { title: 'Vehicles Parked', count: bookedSlots },
      { title: 'Bookings Today', count: bookingsToday },
      { title: 'Available Slots', count: availableSlots >= 0 ? availableSlots : 0 },
    ];
  }

  refreshDashboard() {
    this.loadBookings();
  }
}
