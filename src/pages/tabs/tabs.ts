import { Component } from '@angular/core';

import { AddTaskPage } from '../add-task/add-task';
import { AllTasksPage } from '../all-tasks/all-tasks';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AllTasksPage;
  tab2Root = AddTaskPage;

  constructor() {

  }
}
