import { Component } from '@angular/core';

//local storage
import { Storage } from '@ionic/Storage';
import { TaskModel } from '../../model/TaskModel';
import { AlertController, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AllTasksPage } from '../all-tasks/all-tasks';

@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html'
})
export class AddTaskPage {

  private modoEdicao: boolean;
  private load: boolean;
  private allTasksPage: any = AllTasksPage;
  private templateCarregado = false;

  // tarefas
  private tasks;
  private task: TaskModel;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toast: ToastController,
    private storage: Storage) {


    this.task = new TaskModel();
    this.tasks = [];
    this.templateCarregado = false;
    this.limpaForm();
    this.carregaPagina();
  }

  // alerta para preenchimento dos campos obrigatorios
  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  preencheForm(id) {
    this.limpaForm();
    console.log("id = " + id);
    if (id > 0) {
      this.storage.get('tasks').then((val) => {
        this.tasks = val;
        this.tasks.map(i => {
          if (i.id == id) {
            this.task = i;
            console.log("minha task");
            this.templateCarregado = true;
            console.log(this.task);
          }
        })
      });
    }
    else {      
      this.task.id = 0;
      this.templateCarregado = true;
      console.log(this.task.id);
    }
  }


  deletarTarefa() {
    if (this.task.id > 0) {
      console.log("vai deletar");

      this.tasks = [];
      this.storage.get('tasks').then((val) => {
        if (val != null) {
          this.tasks = val;
          for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == this.task.id) {
              this.tasks.splice(i, 1);
              this.storage.set('tasks', this.tasks);
              this.tasks = [];
              this.presentLoading('Por favor aguarde...', 'Tarefa excluida com sucesso!.');
              break;
            }
          }
        }
      });
    }else{
      this.presentLoading('Por favor aguarde...', 'Nenhuma tarefa a ser deletada!.');
    }
  }

  mensagemDeletar() {
    let alert = this.alertCtrl.create({
      title: "Excluir",
      subTitle: "Deseja realmente excluir essa tarefa?",
      buttons: [
        {
          text: 'NÃO',
        },
        {
          text: 'SIM',
          handler: data => {
            this.deletarTarefa();
          }
        }
      ]
    });
    alert.present();
  }

  presentLoading(content, msg) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: content
    });

    loading.present();

    setTimeout(() => {
      this.limpaForm();
    }, 2000);

    setTimeout(() => {
      loading.dismiss();
      this.criaMensagem(msg);
    }, 3000);
  }

  carregaPagina() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: "Carregando..."
    });

    loading.present();

    setTimeout(() => {
      this.preencheForm(this.navParams.get('id'));
    }, !this.templateCarregado);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  private save() {
    console.log(this.task.id);
    
    if (this.task.id == 0) {
      console.log("vai criar");

      this.tasks = [];
      this.storage.get('tasks').then((val) => {
        if (val != null) {
          this.tasks = val;
        }
        if (this.task.status != true) {
          this.task.status = false;
        }
        this.task.id = this.tasks.length + 1;
        this.tasks.push(this.task);
        this.storage.set('tasks', this.tasks);
        this.tasks = [];
        this.presentLoading('Por favor aguarde...', 'Tarefa criada com sucesso!.');
      });
    } else {
      console.log("vai editar");
      this.tasks = [];
      this.storage.get('tasks').then((val) => {
        if (val != null) {
          this.tasks = val;
          for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == this.task.id) {
              this.tasks.splice(i, 1);
              this.tasks.push(this.task);
              this.storage.set('tasks', this.tasks);
              this.tasks = [];
              this.presentLoading('Por favor aguarde...', 'Tarefa editada com sucesso!.');
              break;
            }
          }
        }
      });
    }
  }

  public verificaPreenchimento() {

    if ((this.task != null)
      && (this.task.dataPrazo != null && this.task.dataPrazo != "")
      && (this.task.horaPrazo != null && this.task.horaPrazo != "")
      && (this.task.nome != null && this.task.nome != "")
      && (this.task.objetivo != null && this.task.objetivo != "")) {
      this.save();
    }
    else {
      this.presentAlert('Campos obrigatórios', 'Campos marcados em (*) são obrigatórios');
    }

  }

  criaMensagem(msg) {
    this.toast.create({ message: msg, duration: 3000, position: 'top' }).present();
  }

  limpaForm() {
    this.task.id = 0;
    this.task.dataPrazo = "";
    this.task.horaPrazo = "";
    this.task.nome = "";
    this.task.objetivo = "";
    this.task.status = false;
  }

}