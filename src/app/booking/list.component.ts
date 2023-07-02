import { Component, inject } from '@angular/core';
import { IBooking } from '../types/IBooking.interface';
import { BookService } from './book.service';

@Component({
  selector: 'app-list',
  template: `
   <h2>Bookings</h2>
   <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Date</th>
      <th>Start Time</th>
      
      <th>Person Count</th>      
      <th>Customer Name</th>
      <th>Customer Phone</th>
      <th>Customer Email</th>
      <th>Reservation</th>   
      <th>Notes</th>   
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let booking of bookings">
      <td>{{ booking.id }}</td>
      <td>{{ booking.bdate }}</td>
      <td>{{ booking.startTime }}</td>    
      <td>{{ booking.personCount }}</td>
      
      <td>{{ booking.customer.name }}</td>
      <td>{{ booking.customer.phone }}</td>
      <td>{{ booking.customer.email }}</td>
      <td>
        <span *ngFor="let table of booking.restaurantTables">
        Table- {{ table.tableNo }} Seat-{{table.seat}} <br />
        </span>
      </td>
      <td>{{ booking.notes }}</td>            
    </tr>
  </tbody>
</table>

  `,
  styles: [
    `table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 8px;
      border: 1px solid #ddd;
    }
    
    th {
      background-color: #f2f2f2;
    }
    `
  ]
})
export class ListComponent {
  private bookingService = inject(BookService);
  bookings: IBooking[] = [];

  constructor() {
    this.getAllBookings();
  }
  getAllBookings() {
    this.bookingService.getAllBookings().subscribe(response => {
      if(response && response.status === 'OK') {
          this.bookings = response.data;
      }
    })   
  }
  getAllBookingsByDate() {        
    this.bookingService.getBookingInfoByDate('2019-06-10').subscribe(response => {
      if(response && response.status === 'OK') {
          this.bookings = response.data;
      }
    })    
  }
}
