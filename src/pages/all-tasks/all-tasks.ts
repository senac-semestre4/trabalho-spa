import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-all-tasks',
  templateUrl: 'all-tasks.html'
})
export class AllTasksPage {

  private tipoFiltro : string;
  private tasks =
  [
    {"id" : 1, "nome" : "Limpar Casa", "data" : "20/08/2017", "status" : true},
    {"id" : 2, "nome" : "Fazer o PI", "data" : "28/10/2017", "status" : false},
    {"id" : 3, "nome" : "Fazer ADO do professor de quinta", "data" : "26/10/2017", "status" : true},
    {"id" : 4, "nome" : "Fazer Prova de EAD", "data" : "11/08/2017", "status" : false},
    {"id" : 5, "nome" : "Dar banho no cachorro", "data" : "02/11/2017", "status" : false},
    {"id" : 6, "nome" : "Entrega do PI", "data" : "12/12/2017", "status" : false},
    {"id" : 7, "nome" : "Levar namorada no cinema", "data" : "13/07/2017", "status" : true},
    {"id" : 8, "nome" : "Terminar o livro", "data" : "10/10/2017", "status" : false},
    {"id" : 9, "nome" : "Fazer alguma coisa chata", "data" : "30/11/2017"},
    {"id" : 10, "nome" : "Fazer outra coisa chata", "data" : "21/10/2017", "status" : false}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  ];

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

  encontraData(data){
    
    let dia : string = data.substr(0 , 2);
    let mes : string = data.substr(3, 2);
    let ano : string = data.substr(6);
    return [dia, mes, ano];
  }

  encontraMes(mes){
    switch (mes) {
      case "01":
        return "Jan";
      case "02" : 
        return "Fev";
      case "03":
        return "Mar";
      case "04" : 
        return "Abr";
      case "05":
        return "Mai";
      case "06" : 
        return "Jun";
      case "07":
        return "Jul";
      case "08" : 
        return "Ago";
      case "09":
        return "Set";
      case "10" : 
        return "Out";
      case "11":
        return "Nov";
      case "12" : 
        return "Dez";
      default:
        return "ERRO";
    }
  }

  verificaDataAtrasada(dataPassada, status : boolean){
    var partesData = dataPassada.split("/");
    var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    return data < new Date() && !status;
  }
}
