import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env} from 'src/environments/environment';
import { IOrder } from '../types/IOrder.interface';
import { IResponse } from '../types/IResponse.interface';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private httpClient = inject(HttpClient)

  constructor() {

  }

  addOrder(order: IOrder) {
    return this.httpClient.post<IOrder>(`${env.BaseAPIUrl}/api/transactions`, order);
  }


  deleteOrder(orderId: number) {
    return this.httpClient.delete<{sucess: string}>(`${env.BaseAPIUrl}/api/transactions/${orderId}`);
  }

  getOrderByCustomerId(customerId: number) {
    //customerId = 1; // FIX ME LATER
    return this.httpClient.get<IResponse<IOrder[]>>(`${env.BaseAPIUrl}/transactions/customer/${customerId}`)
  }

  getAllOrders() {
    return this.httpClient.get<IResponse<IOrder[]>>(`${env.BaseAPIUrl}/transactions`);
  }
}
