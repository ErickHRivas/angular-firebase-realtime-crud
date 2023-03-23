import { Component } from '@angular/core'
import { PersonService } from 'src/app/service/person/person.service'
import { Person } from 'src/app/types'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  public person: Person

  public personList: Person[] = []

  constructor (private readonly personService: PersonService) {
    this.personList = this.personService.getData()
    this.person = this.resetPerson()
  }

  resetPerson (): Person {
    return {
      key: '',
      name: '',
      surnameFather: '',
      surnameMother: '',
      age: 0
    }
  }

  onSubmit (e: any): void {
    e.preventDefault()

    if (this.person.key === '') {
      const formData: any = new FormData(e.target)
      const person = Object.fromEntries(formData)
      person['status'] = true
      this.personService.saveData(person as Person).catch(console.log)
    } else {
      this.personService.updateData(this.person)
      this.person = this.resetPerson()
    }

    e.target.reset()
  }

  delete (id: string): void {
    this.personService.deleteData(id)
  }

  show (idSearch: string): void {
    const { key, name, surnameFather, surnameMother, age } = this.personService.findById(idSearch) as Person
    this.person.key = key
    this.person.name = name
    this.person.surnameFather = surnameFather
    this.person.surnameMother = surnameMother
    this.person.age = age
  }
}
