
import { Injectable } from '@angular/core'

import { AngularFireDatabase } from '@angular/fire/compat/database'
import IDatabaseFirebase from '../IDatabaseFirebase'
import { FirebaseService } from './firebase.database'

@Injectable({
  providedIn: 'root'
})
export class FirebaseFactory<T> {
  constructor (private readonly db: AngularFireDatabase) {
  }

  database (table: string): IDatabaseFirebase<T> {
    return new FirebaseService<T>(this.db, table)
  }
}
