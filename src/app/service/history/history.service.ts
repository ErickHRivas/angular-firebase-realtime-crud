import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Observable } from 'rxjs'

import { FirebaseFactory } from 'src/app/database/firebase/FirebaseFactory'
import IDatabaseFirebase from 'src/app/database/IDatabaseFirebase'

import { History } from 'src/app/types'
import Icr from '../interface/crud/Icr'

@Injectable({
  providedIn: 'root'
})
export class HistoryService implements Icr<History> {
  public historyList: History[] = []
  private readonly database: IDatabaseFirebase<History>

  constructor (
    private readonly db: AngularFireDatabase
  ) {
    this.database = new FirebaseFactory<History>(this.db).database('history')
    // this.historyList = historyJSON.map(({ id, date, action, data }) => {
    //   return {
    //     id,
    //     date,
    //     action,
    //     data
    //   }
    // })

    this.init().catch(console.log)
  }

  async init (): Promise<void> {
    try {
      const data = await this.database.getAll()
      data.forEach((dataItem: History) => {
        this.historyList.push(dataItem)
      })
    } catch (error) {
      console.log(error)
    }
  }

  getData (): History[] {
    return this.historyList
  }

  saveData (data: History): void {
    this.database.create(data)
  }

  msgHistory (action: string, key: string): string {
    const msg: any = {
      ADD: `Se inserto el documento ${key}`,
      DELETE: `Se elimino el documento ${key}`,
      UPDATE: `Se actualizo el documento ${key}`
    }

    return msg[action]
  }

  createData (action: string, key: string, data: string): void {
    const history: History = {
      action,
      msg: this.msgHistory(action, key),
      date: new Date().toLocaleString(),
      data,
      status: true
    }
    this.saveData(history)
  }

  deleteDataAll (): void {
    this.historyList.splice(0)
  }

  getAllTimeReal (): Observable<any[]> {
    return this.database.getAllTimeReal()
  }
}
