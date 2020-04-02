import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {}


  async login(){
    const toast = await this.toastCtrl.create({
      position: 'top',
      message: 'Your settings have been saved.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
    this.router.navigate(['screen/register']);
  }
}
