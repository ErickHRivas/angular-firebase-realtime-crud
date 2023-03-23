import { Observable } from 'rxjs'

export default interface IDatabaseFirebase<T> {
  create: (data: T) => any
  getAll: () => any
  delete: (key: string, data: T) => void
  update: <NT extends Partial<T>>(key: string, data: NT) => void
  getAllTimeReal: () => Observable<any[]>

}
