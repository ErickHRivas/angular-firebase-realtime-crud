
export interface Person {
  key?: string
  name: string
  surnameFather: string
  surnameMother: string
  age: number
  status?: boolean
}

export type PersonWithoutKey = Omit<Person, 'key'>

export interface History {
  date: string
  action: string
  msg: string
  dataNew?: string
  dataOld?: string
  data: string
  status: boolean
}

export interface Route {
  link: string
  text: string
}
