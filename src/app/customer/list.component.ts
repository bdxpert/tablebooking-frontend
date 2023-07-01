import { Component, inject } from '@angular/core';
import { ICustomer } from '../types/ICustomer.interface';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-list',
  template: `
  <h2>Customer List</h2>
  <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <!-- <th>Delete</th> -->
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let customer of customers">
      <td>{{ customer.name }}</td>
      <td>{{ customer.email }}</td>
      <td>{{ customer.phone }}</td>
      <!-- <td><button (click)="onCustomerDeleteHandler(customer.id)">Delete</button></td> -->
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
  private customerService = inject(CustomerService);
  customers: ICustomer[] = [];

  constructor() {
   this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(response => {
      if(response.status === 'OK' && response.data) {
        this.customers = response.data || [];
      }
    })
  }

  onCustomerDeleteHandler(customerId: number) {
    this.customerService.deleteCustomerById(customerId).subscribe(response => {
      if(response.status === 'OK') {
        this.getAllCustomers();
      }
    })
  }

}
