import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { TaskModel } from '../../model/TaskModel';
import { Storage } from '@ionic/Storage'
import { AddTaskPage } from '../add-task/add-task';
@Component({
  selector: 'page-all-tasks',
  templateUrl: 'all-tasks.html'
})
export class AllTasksPage {

  private tipoFiltro: string;
  private tasks;
  private tasksOrdenado = [];
  private tabelaCarregada = false; // a tabela não aparece enquanto não fnalizar o carregamento
  private addPage = AddTaskPage;

  constructor(
    public navCtrl: NavController,
    private storage: Storage) {
    this.tasks = [];
  }

  ionViewDidEnter() {
    this.tasks = [];
    this.getAllTasks();
  }

  getAllTasks() {
    console.log("buscando registros");
    this.tasks = [];
    this.storage.get('tasks').then((val) => {
      if (val != null) {
        this.tasks = val;
      } else {
        this.tasks = [];
      }
      this.tabelaCarregada = true;
      console.log(this.tasks);
    });
  }

  selecionaTarefa(id : number){
    console.log(id);
    
    this.navCtrl.push(AddTaskPage, {
      id: id
    });
  }

  addTask() {
    this.navCtrl.push('AddTaskPage');
  }

  editTask(id: number) {
    
  }



  filtroPorFeito() {
    this.tasks = this.storage.get('tasks');

    this.tipoFiltro = 'feito';

    let cont = 0;

    // PEGA TODOS COM TRUE E ARMAZENA EM tasksOrdenado
    // POPULA O CONT
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i]['status']) {
        this.tasksOrdenado[cont] = this.tasks[i];
        this.tasks[i] = null;
        cont++;
      }
    }

    // ORDENA VETOR AUX
    for (let i = 0; i < this.tasksOrdenado.length; i++) {
      let aux;
      for (let j = 0; j < this.tasksOrdenado.length; j++) {
        if (this.converteData(this.tasksOrdenado[i].data) < this.converteData(this.tasksOrdenado[j].data)) {
          aux = this.tasksOrdenado[i];
          this.tasksOrdenado[i] = this.tasksOrdenado[j];
          this.tasksOrdenado[j] = aux;
        }
      }
    }

    for (let i = 0; i < this.tasks.length; i++) {
      let aux;
      for (let j = 0; j < this.tasks.length; j++) {
        if (this.tasks[i] != null && this.tasks[j] != null) {
          if (this.converteData(this.tasks[i].dataPrazo) < this.converteData(this.tasks[j].dataPrazo)) {
            aux = this.tasks[i];
            this.tasks[i] = this.tasks[j];
            this.tasks[j] = aux;
          }
        }
      }
    }

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i] != null) {
        this.tasksOrdenado[cont] = this.tasks[i];
        cont++;
      }
    }

    this.tasks = this.tasksOrdenado
    this.tasksOrdenado = [];

  }

  filtroPorPrazo() {

    this.tasks = this.storage.get('tasks');
    this.tipoFiltro = 'prazo';

    for (let i = 0; i < this.tasks.length; i++) {
      let aux;
      for (let j = 0; j < this.tasks.length; j++) {
        if (this.converteData(this.tasks[i].dataPrazo) < this.converteData(this.tasks[j].dataPrazo)) {
          aux = this.tasks[i];
          this.tasks[i] = this.tasks[j];
          this.tasks[j] = aux;
        }
      }
    }
  }

  encontraData(data) {
    let ano: string = data.substr(0, 4);
    let mes: string = data.substr(5, 2);
    let dia: string = data.substr(8);
    return [dia, mes, ano];
  }

  // encontra mes e devolve em texto
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

  // verifica se a data esta atrasada e status não está true
  verificaDataAtrasada(data, status: boolean) {
    let dataAtual = new Date();
    let dia = this.encontraData(data)[0];
    let mes = this.encontraData(data)[1];
    let ano = this.encontraData(data)[2];
    
    if (parseInt(ano) == dataAtual.getFullYear()) {
      if (parseInt(mes) == (dataAtual.getMonth()+1)) {
        return parseInt(dia) < dataAtual.getDate() && !status;
      } else if (parseInt(mes) > (dataAtual.getMonth()+1)) {
        return !status;
      } else {
        return false;
      }
    } else if (parseInt(ano) < dataAtual.getFullYear()) {
      return !status;
    } else {
      return false;
    }
  }

  /*  verificaDataAtrasada(data, status: boolean) {
     let dataAtual = new Date;
     let dia = this.converteData(data)[0];
     let mes = this.converteData(data)[1]
     let ano = this.converteData(data)[2];
     console.log(dia, mes, ano);
  */
  /* 
  let diaMenor: boolean = false;
  let mesMenor: boolean = false;
  let anoMenor: boolean = false;

  anoMenor = data.getFullYear() < ano;
  mesMenor = dataAtual.getMonth() < mes;
  diaMenor = dataAtual.getDate() < dia;

  console.log(dataAtual.getDate()); 

  //let minhaData = ano + ""+ mes +""+ dia;

}*/

  pegarHora(h) {
    let i = h.search(":");
    return h.substr(0, i);
  }

  pegarMinuto(h) {
    let i = h.search(":");
    return h.substr(i + 1);
  }
}
