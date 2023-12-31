export interface IOrder {
    id?: number
    date: string
    paidAmount: number
    outstandingBalance: number
    balance: number
    notes: string
    customer: Customer
    booking: Booking
  }
  
  export interface Customer {
    id: number
    name: string
    phone: string
    email: string
  }
  
  export interface Booking {
    id: number
    bdate: string
    startTime: string
    personCount: number
    notes: string
  }
  