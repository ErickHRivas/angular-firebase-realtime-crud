import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HistoryModule } from './module/history/history.module'
import { PersonModule } from './module/person/person.module'

const routes: Routes = [
  {
    path: 'person',
    loadChildren: () => PersonModule
  },
  {
    path: 'history',
    loadChildren: () => HistoryModule
  },
  { path: '', redirectTo: '/history', pathMatch: 'full' },
  { path: '**', redirectTo: '/history', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
