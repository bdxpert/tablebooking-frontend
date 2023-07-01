import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer/customer.service';
import { IBooking } from '../types/IBooking.interface';
import { ICustomer } from '../types/ICustomer.interface';
import { ITable } from '../types/ITable.interface';
import { BookService } from './book.service';

@Component({
  selector: 'app-add',
  template: `
    <h2>Add Booking</h2>
    <form [formGroup]="bookingForm" (submit)="onReserveHandler()">
  <div>
    <label for="bdate">Booking Date</label>
    <input type="date" formControlName="bdate" (input)="getAvailableTablesByDate()" required>
    <div *ngIf="bdate.invalid && bdate.touched">
      <div *ngIf="bdate.errors?.['required']">Booking Date is required.</div>
    </div>
  </div>

  <div>
    <label for="btime">Booking Time</label>
    <input type="time" formControlName="btime" required>
    <div *ngIf="btime.invalid && btime.touched">
      <div *ngIf="btime.errors?.['required']">Booking Time is required.</div>
    </div>
  </div>

  <div>
    <label for="personCount">Number of Persons</label>
    <input type="number" id="personCount" formControlName="personCount" required>
    <div *ngIf="personCount.invalid && personCount.touched">
      <div *ngIf="personCount.errors?.['required']">Number of Persons is required.</div>
      <div *ngIf="personCount.errors?.['min']">Number of Persons must be greater than or equal to 1.</div>
    </div>
  </div>

  <div>
    <label for="notes">Notes</label>
    <textarea id="notes" formControlName="notes"></textarea>
  </div>

  <div>
    <label for="customerId">Customer</label>
    <select id="customerId" formControlName="customer" required>
      <option value="">Select a customer</option>
      <option *ngFor="let customer of customers" [value]="customer.id">{{ customer.name }}</option>
    </select>
    <div *ngIf="customer.invalid && customer.touched">
      <div *ngIf="customer.errors?.['required']">Customer is required.</div>
    </div>
  </div>

  <div>
    <label for="restaurantTables">Restaurant Tables</label>
    <select id="restaurantTables" formControlName="restaurantTables" multiple required>
      <option value="">Select restaurant tables</option>
      <option *ngFor="let table of availableBookings" [value]="table.id">Table No # {{ table.tableNo }}({{table.seat}})</option>
    </select>
    <div *ngIf="restaurantTables.invalid && restaurantTables.touched">
      <div *ngIf="restaurantTables.errors?.['required']">At least one Restaurant Table must be selected.</div>
    </div>
  </div>

<button>Reserve</button>
</form>

  `,
  styles: [
    `/* Styles for the Add Booking form */
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
    private router = inject(Router);

    customers: ICustomer[] = [];
    availableBookings: ITable[] = [];


    bookingForm: FormGroup = inject(FormBuilder).nonNullable.group({
      bdate: ['', Validators.required],
      btime: ['', Validators.required],
      personCount: ['', [Validators.required, Validators.min(1)]],
      notes: [''],
      customer: ['', [Validators.required]],
      restaurantTables: [[], [Validators.required]]
    });

    constructor() {
      this.getAllCustomer();
    }

    get bdate() {
      return this.bookingForm.get('bdate') as FormControl;
    }
  
    get btime() {
      return this.bookingForm.get('btime') as FormControl;
    }
  
    get personCount() {
      return this.bookingForm.get('personCount') as FormControl;
    }
  
    get notes() {
      return this.bookingForm.get('notes') as FormControl;
    }
  
    get customer() {
      return this.bookingForm.get('customer') as FormControl;
    }
  
    get restaurantTables() {
      return this.bookingForm.get('restaurantTables') as FormControl;
    }

    getAllCustomer() {
      this.customerService.getAllCustomers().subscribe(response => {
        if(response && response.status === 'OK') {
          this.customers = response.data;
        }
      })
    }

    getAvailableTablesByDate() {
      //const date = this.bdate.value;
      const date = '2019-06-10';
      console.log('####', date);
      this.bookService.restaurantTablesByDate(date).subscribe(response => {
        if(response && response.status === 'OK') {
          this.availableBookings = response.data;
        }
      })
    }

    onReserveHandler() {
      const booking: IBooking = {
        bdate: this.bdate.value,
        btime: this.btime.value,
        customer: {
          id: Number(this.customer.value),
          name: '',
          phone: '',
          email: '',
        },
        notes: this.notes.value,
        personCount: this.personCount.value,
        restaurantTables: this.restaurantTables.value.map((table: any) => {
          const retVal  = {
            id: Number(table)
          };
          return retVal;
        })
      };
      this.bookService.createBooking(booking).subscribe(response => {
        if(response && response.status === 'OK') {
          this.bookingForm.reset();
          console.log('Booking information saved successfully');
          this.router.navigate(['', 'booking']);
        }
      })
    }
}
