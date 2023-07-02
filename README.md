# Restaurant Table Booking
Restaurant table booking
- Two actor in this application
  a. restaurant manager
  b. client/customer
- Client call to manager for booking the table with date, time, number of person
- Manager can
  a. create booking
  b. view booking
  c. view payment transaction details
  d. create payment transaction
  e. view customer details
- Booking can contains one customer with multiple restaurant tables, multiple payment transaction (initial payment + final payment)
- Once a table is booked it is no longer be available for booking 

# TableBookingApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
