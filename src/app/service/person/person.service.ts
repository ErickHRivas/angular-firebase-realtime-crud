import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'

import { FirebaseFactory } from 'src/app/database/firebase/FirebaseFactory'
import IDatabaseFirebase from 'src/app/database/IDatabaseFirebase'

import { Person, PersonWithoutKey } from 'src/app/types'
import { HistoryService } from '../history/history.service'
import Icrud from '../interface/crud/Icrud'

@Injectable({
  providedIn: 'root'
})
export class PersonService implements Icrud<Person> {
  private readonly personList: Person[] = []
  private readonly database: IDatabaseFirebase<Person>

  constructor (
    private readonly db: AngularFireDatabase
  ) {
    this.database = new FirebaseFactory<Person>(this.db).database('person')
    this.init().catch(console.log)
  }

  async init (): Promise<void> {
    try {
      const data = await this.database.getAll()
      data.forEach((dataItem: Person) => {
        this.personList.push(dataItem)
      })
    } catch (error) {
      console.log(error)
    }
  }

  getData (): Person[] {
    return this.personList
  }

  // getId (): string {
  //   if (this.personList.length === 0) return '1'
  //   const id: number = parseInt(this.personList[this.personList.length - 1].key)
  //   return (id + 1).toString()
  // }

  async saveData (person: Person): Promise<void> {
    const response = await this.database.create(person)

    const historyService = new HistoryService(this.db)
    historyService.createData('ADD', response.key, JSON.stringify(person))
    // person.id = this.getId()
    person.key = response.key
    this.personList.push(person)
  }

  deleteData (keyDelete: string): void {
    const indexToDelete = this.personList.findIndex(person => person.key === keyDelete)
    const personDelete: Person = this.personList[indexToDelete]
    personDelete.status = false
    this.database.delete(keyDelete, personDelete)

    const historyService = new HistoryService(this.db)
    historyService.createData('DELETE', keyDelete, JSON.stringify({ key: keyDelete }))

    if (indexToDelete !== -1) {
      this.personList.splice(indexToDelete, 1)
    }
  }

  findById (keySearch: string): Person | undefined {
    const person: Person | undefined = this.personList.find(({ key }) => key === keySearch)
    return person
  }

  updateData ({ key, ...restDataPerson }: Person): void {
    const keyPerson: string = key ?? ''
    this.database.update <PersonWithoutKey>(keyPerson, restDataPerson)

    const historyService = new HistoryService(this.db)
    historyService.createData('UPDATE', keyPerson, JSON.stringify({ key }))

    for (const personItem of this.personList) {
      if (personItem.key === key) {
        personItem.name = restDataPerson.name
        personItem.surnameFather = restDataPerson.surnameFather
        personItem.surnameMother = restDataPerson.surnameMother
        personItem.age = restDataPerson.age
        break
      }
    }
  }
}
