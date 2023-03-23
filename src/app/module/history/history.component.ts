import { Component } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'
// import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'
import { HistoryService } from 'src/app/service/history/history.service'
// import { FirebaseService } from 'src/app/database/firebase/firebase.service'
// import { History } from 'src/app/types'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  // public historyList: History[] = []
  historyList: Observable<any[]>
  constructor (private readonly db: AngularFireDatabase, private readonly historyService: HistoryService) {
    // this.historyList = this.historyService.getData()
    // this.historyList = firestore.collection('history').valueChanges()
    // this.historyList = this.db.list('history').valueChanges()
    this.historyList = this.historyService.getAllTimeReal()
    // this.getDataTimeReal()
  //   // const data: History = {
  //   //   id: '2',
  //   //   date: '10/20/20',
  //   //   action: 'add',
  //   //   data: ''
  //   // }
  //   // this.firebase.createData(data)
  }

  // getDataTimeReal (): void {
  //   // this.historyService.getAllTimeReal()
  // }

  getClassByAction (action: string): string {
    const msg: any = {
      ADD: 'text-bg-success',
      DELETE: 'text-bg-danger',
      UPDATE: 'text-bg-warning'
    }
    return msg[action]
  }
}
