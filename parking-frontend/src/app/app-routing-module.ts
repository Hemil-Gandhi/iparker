import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Slots } from './components/slots/slots';
import { Vehicles } from './components/vehicles/vehicles';
import { Bookings } from './components/bookings/bookings';
import { Reports } from './components/reports/reports';

const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'lots',
    component: Slots,
  },
  { path: 'vehicles', component: Vehicles },
  { path: 'bookings', component: Bookings },
  { path: 'reports', component: Reports },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
