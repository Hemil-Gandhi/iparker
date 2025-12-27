import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:5000/api'; // Backend base URL

  constructor(private http: HttpClient) {}

  //VEHICLES

  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles`);
  }

  addVehicle(vehicleData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/vehicles`, vehicleData);
  }

  updateVehicle(id: string, vehicleData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/vehicles/${id}`, vehicleData);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/vehicles/${id}`);
  }
  updateSlotStatus(slotNumber: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/slots/${slotNumber}`, { status });
  }

  //  PARKING SLOTS

  getSlots(): Observable<any> {
    return this.http.get(`${this.baseUrl}/slots`);
  }

  getAvailableSlots(): Observable<any> {
    return this.http.get(`${this.baseUrl}/slots/available`);
  }

  bookSlot(slotId: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/slots/book/${slotId}`, data);
  }

  //USERS

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userData);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, credentials);
  }

  getBookings() {
    return this.http.get<any[]>(`${this.baseUrl}/bookings`);
  }

  addBooking(booking: any) {
    return this.http.post(`${this.baseUrl}/bookings`, booking);
  }
  deleteBooking(id: string) {
    return this.http.delete(`${this.baseUrl}/bookings/${id}`);
  }

  getReports() {
    return this.http.get(`${this.baseUrl}/reports`);
  }
}
