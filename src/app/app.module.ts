import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'booking',
        pathMatch: 'full'
      },
      {
        path: 'customer',
         loadChildren: () => import('./customer/customer.module').then(module=> module.CustomerModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(module=> module.OrderModule)
        },
        {
          path: 'booking',
          loadChildren: () => import('./booking/booking.module').then(module=> module.BookingModule)
          },
      {
        path: '**',
        component: PageNotFoundComponent
      }
  ])
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
