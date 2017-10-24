import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-all-tasks',
  templateUrl: 'all-tasks.html'
})
export class AllTasksPage implements OnInit{

  private tipoFiltro: string;
  private tasks =
  [
    { "id": 1, "nome": "Limpar Casa", "data": "20/08/2017", "status": true },
    { "id": 2, "nome": "Fazer o PI", "data": "28/10/2017", "status": false },
    { "id": 3, "nome": "Fazer ADO do professor de quinta", "data": "26/10/2017", "status": true },
    { "id": 4, "nome": "Fazer Prova de EAD", "data": "11/08/2017", "status": false },
    { "id": 5, "nome": "Dar banho no cachorro", "data": "02/11/2017", "status": false },
    { "id": 6, "nome": "Entrega do PI", "data": "12/12/2017", "status": false },
    { "id": 7, "nome": "Levar namorada no cinema", "data": "13/07/2017", "status": true },
    { "id": 8, "nome": "Terminar o livro", "data": "10/10/2017", "status": false },
    { "id": 9, "nome": "Fazer alguma coisa chata", "data": "30/11/2017" },
    { "id": 10, "nome": "Fazer outra coisa chata", "data": "21/10/2017", "status": false }
  ];

  private tasksOrdenado = [];
  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
    this.filtroPorPrazo();
  }

  filtroPorFeito() {
    this.tipoFiltro = 'feito';

    console.log("Filtro por feito");
    let cont = 0;

    // PEGA TODOS COM TRUE E ARMAZENA EM tasksOrdenado
    // POPULA O CONT
    for (var i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i]['status']){
        this.tasksOrdenado[cont] = this.tasks[i];
        this.tasks[i] = null;
        cont++;
      }
    }

    // ORDENA VETOR AUX
    for (var i = 0; i < this.tasksOrdenado.length; i++) {
      let aux;
      for (var j = 0; j < this.tasksOrdenado.length; j++) {
        if (this.converteData(this.tasksOrdenado[i].data) < this.converteData(this.tasksOrdenado[j].data)) {
          aux = this.tasksOrdenado[i];
          this.tasksOrdenado[i] = this.tasksOrdenado[j];
          this.tasksOrdenado[j] = aux;
        }
      }
    }

    for (var i = 0; i < this.tasks.length; i++) {
      let aux;
      for (var j = 0; j < this.tasks.length; j++) {
        if(this.tasks[i] != null && this.tasks[j] != null){
          if (this.converteData(this.tasks[i].data) < this.converteData(this.tasks[j].data)) {
            aux = this.tasks[i];
            this.tasks[i] = this.tasks[j];
            this.tasks[j] = aux;
          }
        }
      }
    }

    for (var i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i] != null){
        this.tasksOrdenado[cont] = this.tasks[i];
        cont++;
      }
    }

    this.tasks = this.tasksOrdenado
    this.tasksOrdenado= [];
    
  }

  filtroPorPrazo() {
    this.tipoFiltro = 'prazo';

    console.log("Filtro por prazo");

    for (var i = 0; i < this.tasks.length; i++) {
      let aux;
      for (var j = 0; j < this.tasks.length; j++) {
        if (this.converteData(this.tasks[i].data) < this.converteData(this.tasks[j].data)) {
          aux = this.tasks[i];
          this.tasks[i] = this.tasks[j];
          this.tasks[j] = aux;
        }
      }
    }
  }

  encontraData(data) {

    let dia: string = data.substr(0, 2);
    let mes: string = data.substr(3, 2);
    let ano: string = data.substr(6);
    return [dia, mes, ano];
  }

  encontraMes(mes) {
    switch (mes) {
      case "01":
        return "Jan";
      case "02":
        return "Fev";
      case "03":
        return "Mar";
      case "04":
        return "Abr";
      case "05":
        return "Mai";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Ago";
      case "09":
        return "Set";
      case "10":
        return "Out";
      case "11":
        return "Nov";
      case "12":
        return "Dez";
      default:
        return "ERRO";
    }
  }

  converteData(dataPassada) {
    var partesData = dataPassada.split("/");
    var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    return data;

  }
  verificaDataAtrasada(data, status: boolean) {
    return data < new Date() && !status;
  }
}
