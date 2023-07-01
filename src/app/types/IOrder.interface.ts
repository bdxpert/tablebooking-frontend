export interface IOrder {
    id: number
    date: string
    paidAmount: number
    dueAmount: number
    balance: number
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
    btime: string
    personCount: number
    notes: string
  }
  