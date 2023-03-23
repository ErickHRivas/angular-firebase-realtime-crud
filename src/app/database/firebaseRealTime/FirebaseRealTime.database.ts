
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { map, firstValueFrom, Observable } from 'rxjs'

import IDatabase from '../IDatabase'

export class FirebaseService<T> implements IDatabase<AngularFireList<T>> {
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
        map((changes: any) =>
          changes.map((c: any) =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      )

      const data = await firstValueFrom(handle)
      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  delete (key: string): void {
    this.instanceDB.remove(key).catch(console.log)
  }

  update<NT extends Partial<T>> (keyDb: string, data: NT): void {
    this.instanceDB.update(keyDb, data).catch(console.log)
  }

  getAllTimeReal (): Observable<any[]> {
    return this.instanceDB.valueChanges()
  }
}
