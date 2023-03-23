import { Component } from '@angular/core'
import { Route } from '../types'

import routeJSON from './route.json'

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent {
  public readonly routes: Route[]

  constructor () {
    this.routes = routeJSON as Route[]
  }
}
