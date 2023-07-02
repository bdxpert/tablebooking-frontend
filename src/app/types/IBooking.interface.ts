export interface IBooking {
    id?: number
    bdate: string
    startTime: string    
    personCount: number
    notes: string
    customer: Customer
    restaurantTables: RestaurantTable[]
  }
  
  export interface Customer {
    id: number
    name: string
    phone: string
    email: string
  }
  
  export interface RestaurantTable {
    id: number
    tableNo: number
    seat: number
  }
  