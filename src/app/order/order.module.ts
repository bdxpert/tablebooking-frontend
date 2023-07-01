import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { AddComponent } from './add.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: 'list',
      component: ListComponent
    },
    {
      path: 'add',
      component: AddComponent
    }
  ])
  ]
})
export class OrderModule { }
