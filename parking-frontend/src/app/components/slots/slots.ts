import { Component, OnDestroy, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-slots',
  standalone: false,
  templateUrl: './slots.html',
  styleUrl: './slots.css',
})
export class Slots implements OnInit {
  slots: any[] = [];

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.loadSlots();
  }

  loadSlots() {
    this.api.getSlots().subscribe({
      next: (slotsData) => {
        this.api.getBookings().subscribe({
          next: (bookingsData) => {
            this.slots = slotsData.map((slot: any) => {
              const booked = bookingsData.some((b: any) => b.slotNumber === slot.slotNumber);
              return {
                ...slot,
                status: booked ? 'Booked' : 'Available',
              };
            });
          },
          error: (err) => console.error('Error loading bookings:', err),
        });
      },
      error: (err) => console.error('Error loading slots:', err),
    });
  }
}
