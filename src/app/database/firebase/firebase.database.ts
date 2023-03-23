
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { map, firstValueFrom, Observable } from 'rxjs'

import IDatabaseFirebase from '../IDatabaseFirebase'

export class FirebaseService<T> implements IDatabaseFirebase<T> {
  instanceDB: AngularFireList<T>

  constructor (
    private readonly db: AngularFireDatabase,
    table: string
  ) {
    this.instanceDB = this.db.list(table)
  }

  create (data: T): any {
    return this.instanceDB.push(data)
  }

  async getAll (): Promise<T[]> {
    try {
      const handle = this.instanceDB.snapshotChanges().pipe(
        map((changes: any) => {
          const dataArray: T[] = []
          changes.forEach((c: any) => {
            if (c.payload.val().status === true) { dataArray.push({ key: c.payload.key, ...c.payload.val() }) }
          })
          return dataArray
        }
        )
      )

      const data = await firstValueFrom(handle)
      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  delete (key: string, data: T): void {
    // this.instanceDB.remove(key).catch(console.log)
    this.instanceDB.update(key, data).catch(console.log)
  }

  update<NT extends Partial<T>> (keyDb: string, data: NT): void {
    this.instanceDB.update(keyDb, data).catch(console.log)
  }

  getAllTimeReal (): Observable<any[]> {
    return this.instanceDB.valueChanges()
  }
}
