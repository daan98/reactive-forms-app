import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
  ]
})
export class SideMenuComponent {

  public reactiveMenu : MenuItem[] = [
    { title: 'Basics', route: '/reactive/basic' },
    { title: 'Dynamic', route: '/reactive/dynamic' },
    { title: 'Switches', route: '/reactive/switches' },
  ];

  public authMenu : MenuItem[] = [
    { title: 'Register', route: '/auth'}
  ]

}
