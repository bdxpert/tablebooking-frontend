import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBooking } from '../types/IBooking.interface';
import { IResponse } from '../types/IResponse.interface';
import { environment as env } from 'src/environments/environment';
import { ITable } from '../types/ITable.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private httpClient = inject(HttpClient)

  constructor() { }
  getAllBookings() {
    return this.httpClient.get<IResponse<IBooking[]>>(`${env.BaseAPIUrl}/bookings`);
  }
  getBookingInfoByDate(date: string) {
    return this.httpClient.get<IResponse<IBooking[]>>(`${env.BaseAPIUrl}/bookings/date/${date}`);
  }

  createBooking(booking: IBooking) {
    return this.httpClient.post<IResponse<IBooking>>(`${env.BaseAPIUrl}/bookings`, booking);
  }

  restaurantTablesByDate(date: string) {
    return this.httpClient.get<IResponse<ITable[]>>(`${env.BaseAPIUrl}/restaurant-tables/available-on-date/${date}`);
  }

}
