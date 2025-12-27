import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Dashboard } from './components/dashboard/dashboard';
import { Vehicles } from './components/vehicles/vehicles';
import { Slots } from './components/slots/slots';
import { Navbar } from './components/navbar/navbar';
import { Bookings } from './components/bookings/bookings';
import { Reports } from './components/reports/reports';
import { FormsModule } from '@angular/forms';
import { Sidebar } from './components/sidebar/sidebar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [App, Dashboard, Vehicles, Slots, Navbar, Bookings, Reports, Sidebar],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, MatSnackBarModule],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
  bootstrap: [App],
})
export class AppModule {}
