import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer/customer.service';
import { BookService } from '../booking/book.service';
import { OrderService } from '../order/order.service';
import { IBooking } from '../types/IBooking.interface';
import { IOrder } from '../types/IOrder.interface';
import { ICustomer } from '../types/ICustomer.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  template: `
  <h2>Add Transaction</h2>
  
  <form [formGroup]="orderForm" (submit)="onReserveHandler()">
  <!-- Order ID -->

  <!-- Order Date -->
  <div>
    <label for="orderDate">Transaction Date</label>
    <input type="date" id="orderDate" formControlName="date">
    <div *ngIf="date.invalid && date.touched">
      <div *ngIf="date.errors?.['required']">Transaction Date is required.</div>
    </div>
  </div>

  <!-- Paid Amount -->
  <div>
    <label for="paidAmount">Paid Amount</label>
    <input type="number" id="paidAmount" formControlName="paidAmount">
    <div *ngIf="paidAmount.invalid && paidAmount.touched">
      <div *ngIf="paidAmount.errors?.['required']">Paid Amount is required.</div>
      <div *ngIf="paidAmount.errors?.['min']">Paid Amount must be greater than or equal to 0.</div>
    </div>
  </div>

  <!-- Due Amount -->
  <div>
    <label for="dueAmount">Due Amount</label>
    <input type="number" id="dueAmount" formControlName="dueAmount">
    <div *ngIf="dueAmount.invalid && dueAmount.touched">
      <div *ngIf="dueAmount.errors?.['required']">Due Amount is required.</div>
      <div *ngIf="dueAmount.errors?.['min']">Due Amount must be greater than or equal to 0.</div>
    </div>
  </div>

  <!-- Balance -->
  <!--
  <div>
    <label for="balance">Balance</label>
    <input type="number" id="balance" formControlName="balance">
    <div *ngIf="balance.invalid && balance.touched">
      <div *ngIf="balance.errors?.['required']">Balance is required.</div>
      <div *ngIf="balance.errors?.['min']">Balance must be greater than or equal to 0.</div>
    </div>
  </div>
  -->
  <!-- Customer -->
  
  <div>
    <label for="customer">Customer</label>
    <select id="customer" formControlName="customer" (change)="getAvailableBookingByCustomer()">
      <option value="">Select a customer</option>
      <option *ngFor="let customer of customers" [value]="customer.id">{{ customer.name }}</option>
    </select>
    <div *ngIf="customer.invalid && customer.touched">
      <div *ngIf="customer.errors?.['required']">Customer is required.</div>
    </div>
  </div>

  <!-- Booking -->
  <div>
    <label for="booking">Booking</label>
    <select id="booking" formControlName="booking">
      <option value="">Select a booking</option>
      <option *ngFor="let booking of bookings" [value]="booking.id">{{ booking.bdate }}</option>
    </select>
    <div *ngIf="booking.invalid && booking.touched">
      <div *ngIf="booking.errors?.['required']">Booking is required.</div>
    </div>
  </div>
  <div>
    <label for="notes">Notes</label>
    <textarea id="notes" formControlName="notes"></textarea>
  </div>
  <button>Submit</button>
</form>
  `,
  styles: [
    `
    h2 {
  text-align: center;
  color: #333;
}

form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="date"],
input[type="time"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select[multiple] {
  height: 120px; /* Adjust the height as needed */
}

div.error {
  color: #dc3545;
  margin-top: 5px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
    `
  ]
})
export class AddComponent {
  private customerService = inject(CustomerService);
  private bookService = inject(BookService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  customers: ICustomer[] = [];
  bookings: IBooking[] = [];
  
  orderForm : FormGroup=inject(FormBuilder).nonNullable.group({
    //id: [null, Validators.required],
    date: [null, Validators.required],
    paidAmount: [0, [Validators.required, Validators.min(0)]],
    dueAmount: [0, [Validators.required, Validators.min(0)]],
    balance: [0, [Validators.required, Validators.min(0)]],
    customer: ['', [Validators.required]],
    booking: ['', [Validators.required]],
    notes: ['']
  });

  constructor() {
    this.getAllCustomer();
  }  
  /*
  get orderId() {
    return this.orderForm.get('id') as FormControl;
  }*/

  get date() {
    return this.orderForm.get('date') as FormControl;
  }
  get paidAmount() {
    return this.orderForm.get('paidAmount') as FormControl;
  }
  get dueAmount() {
    return this.orderForm.get('dueAmount') as FormControl;
  }
  get balance() {
    return this.orderForm.get('balance') as FormControl;
  }
  get notes() {
    return this.orderForm.get('notes') as FormControl;
  }
  get customer() {
    return this.orderForm.get('customer') as FormControl;
  }
  get booking() {
    return this.orderForm.get('booking') as FormControl;
  }
  

  getAllCustomer() {
    this.customerService.getAllCustomers().subscribe(response => {
      if(response && response.status === 'OK') {
        this.customers = response.data;
      }
    })
  }
  getAvailableBookingByCustomer() {
    const customerId = this.customer.value;

    this.bookService.getAllBookingsByCustomer(customerId).subscribe(response =>{
      if(response && response.status === 'OK') {
        this.bookings = response.data;
      }
    })
  }

  onReserveHandler() {
    const orders: IOrder = {
      date: this.date.value,
      paidAmount: this.paidAmount.value,        
      dueAmount: this.dueAmount.value,        
      balance: this.dueAmount.value - this.paidAmount.value,        
      notes: this.notes.value,
      customer: {
        id: Number(this.customer.value),   
        name: '',
          phone: '',
          email: '',     
      },
      booking: {
        id: Number(this.booking.value),
        bdate: '',
        startTime: '',
        personCount: 0,
        notes: ''
      }      
    };

    this.orderService.addOrder(orders).subscribe(response => {
      if(response && response.status === 'OK') {
        this.orderForm.reset();
        console.log('Order information saved successfully');
        this.router.navigate(['', 'order', 'list']);
      }
    });
  }

}
