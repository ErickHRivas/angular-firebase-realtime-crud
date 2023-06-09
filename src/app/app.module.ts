import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'

import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { RouteComponent } from './route/route.component'

@NgModule({
  declarations: [
    AppComponent,
    RouteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
