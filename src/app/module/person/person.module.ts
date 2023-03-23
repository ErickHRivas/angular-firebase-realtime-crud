import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { PersonRoutingModule } from './person-routing.module'
import { PersonComponent } from './person.component'

@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
