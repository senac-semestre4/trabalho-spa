import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-all-tasks',
  templateUrl: 'all-tasks.html'
})
export class AllTasksPage {

  constructor(public navCtrl: NavController) {

  }

  filtroPorFeito(){
    console.log("Filtro por feito");
  }

  filtroPorPrazo(){
    console.log("Filtro por prazo");
  }
}
