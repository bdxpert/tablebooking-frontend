import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICustomer } from '../types/ICustomer.interface';
import { environment as env } from 'src/environments/environment';
import { IResponse } from '../types/IResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private httpClient = inject(HttpClient);

  constructor() { }

  getAllCustomers() {
    return this.httpClient.get<IResponse<ICustomer[]>>(`${env.BaseAPIUrl}/customers`);
  }

  getCustomerById(customerId: number) {
    return this.httpClient.get<IResponse<ICustomer>>(`${env.BaseAPIUrl}/customers/${customerId}`);
  }

  deleteCustomerById(customerId: number) {
    return this.httpClient.delete<IResponse<ICustomer>>(`${env.BaseAPIUrl}/customers/${customerId}`);
  }

  addCustomer(customer: ICustomer) {
    return this.httpClient.post(`${env.BaseAPIUrl}/customers/`, customer);
  }
}
