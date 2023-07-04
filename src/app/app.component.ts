import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
   <nav>
    <a [routerLink]="['', 'booking']">Booking</a> &nbsp;| 
    <a [routerLink]="['', 'booking', 'add']">Add Booking</a>&nbsp;| 
    <a [routerLink]="['', 'customer', 'list']">Customer</a>&nbsp;|
    <a [routerLink]="['', 'order', 'list']">Transaction</a>&nbsp;|
    <a [routerLink]="['', 'order', 'add']">Add Transaction</a>
   </nav>
   <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'table-booking-app';
}
