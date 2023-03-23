import { Observable } from 'rxjs'

export default interface IDatabaseFirebaseRealTime {
  getAllTimeReal: () => Observable<any[]>
}
