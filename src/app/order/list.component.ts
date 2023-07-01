import { Component, inject } from '@angular/core';
import { IOrder } from '../types/IOrder.interface';
import { OrderService } from './order.service';

@Component({
  selector: 'app-list',
  template: `
   <h2>Transaction List</h2>
   <table class="order-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Date</th>
      <th>Paid Amount</th>
      <th>Due Amount</th>
      <th>Balance</th>
      <th>Customer Name</th>
      <th>Customer Phone</th>
      <th>Customer Email</th>
      <th>Booking Date</th>
      <th>Booking Time</th>
      <th>Person Count</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let order of orders">
      <td>{{ order.id }}</td>
      <td>{{ order.date }}</td>
      <td>{{ order.paidAmount }}</td>
      <td>{{ order.dueAmount }}</td>
      <td>{{ order.balance }}</td>
      <td>{{ order.customer.name }}</td>
      <td>{{ order.customer.phone }}</td>
      <td>{{ order.customer.email }}</td>
      <td>{{ order.booking.bdate }}</td>
      <td>{{ order.booking.btime }}</td>
      <td>{{ order.booking.personCount }}</td>
      <td>{{ order.booking.notes }}</td>
    </tr>
  </tbody>
</table>

  `,
  styles: [
    `.order-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    
    .order-table th,
    .order-table td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: center;
    }
    
    .order-table th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    
    .order-table tbody tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    
    .order-table tbody tr:hover {
      background-color: #e0e0e0;
    }
    `
  ]
})
export class ListComponent {
  private orderService = inject(OrderService);
  orders: IOrder[] = [];

  constructor() {
    this.getAllOrders();
  } 

  getAllOrders() {
    

    this.orderService.getAllOrders().subscribe(response => {
      if(response.status === 'OK' && response.data) {
        this.orders = response.data || [];
      }
    })
    /*
    this.orderService.getOrderByCustomerId(1).subscribe(response => {
      if(response && response.status === 'OK') {
        this.orders = response.data;
      }
    });
    */
  }
}
