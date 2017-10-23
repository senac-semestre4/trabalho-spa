import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-all-tasks',
  templateUrl: 'all-tasks.html'
})
export class AllTasksPage {

  private tipoFiltro : string;
  constructor(public navCtrl: NavController) {

  }

  filtroPorFeito(){
    this.tipoFiltro = 'feito';
    console.log("Filtro por feito");
  }

  filtroPorPrazo(){
    this.tipoFiltro = 'prazo';
    console.log("Filtro por prazo");
  }
}
