import { Component } from '@angular/core';
import { Api } from '../../services/api';
@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  reports: any[] = [];
  totalBookings: number = 0;
  totalVehicles: number = 0;
  totalRevenue: number = 0;
  avgDuration: string = '0';
  reportDate: string = '';

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.getReports().subscribe((data: any) => {
      this.totalBookings = data.totalBookings;
      this.totalVehicles = data.totalVehicles;
      this.totalRevenue = data.totalRevenue;
      this.avgDuration = data.avgDuration;
      this.reportDate = new Date(data.reportDate).toLocaleString();
    });
  }
}
