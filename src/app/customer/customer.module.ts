import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { AddComponent } from './add.component';
import { UpdateComponent } from './update.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:'list',
      component: ListComponent
    },
    {
      path: 'add',
      component: AddComponent
    },
    {
      path: 'update',
      component: UpdateComponent
    }
  ])
  ]
})
export class CustomerModule { }
