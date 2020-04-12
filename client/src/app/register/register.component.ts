import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterDetails } from '../types/registerDetails';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userDetails: RegisterDetails = {
    email: '',
    password: '',
    cnfrmPassword: '',
    name: ''
};
  constructor(private router: Router, private toastCtrl: ToastController, private apiService: ApiService) { }

  ngOnInit() {}

  async register(){
    if((this.userDetails.password.length <= 5) || (this.userDetails.password != this.userDetails.cnfrmPassword) || (this.userDetails.name.length <= 5)){
      const toast = await this.toastCtrl.create({
        position: 'top',
        message: 'Please enter a valid password',
        duration: 2000,
        color: 'danger'
      });

      toast.present();

      return false;

    }else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userDetails.email)) || (this.userDetails.password != this.userDetails.cnfrmPassword) || (this.userDetails.name.length <= 5)){

      const toast = await this.toastCtrl.create({
        position: 'top',
        message: 'Please enter valid details',
        duration: 2000,
        color: 'danger'
      });

      toast.present();

      return false;

    }else{
      this.apiService.registerUser(this.userDetails)
      .subscribe( async (results: any)=>{
        if(results.success){
          this.router.navigate(['screen/login']);
        }else{
          const toast = await this.toastCtrl.create({
            position: 'top',
            message: 'Please enter valid details',
            duration: 2000,
            color: 'danger'
          });
    
          toast.present();

          return false;
        }
      })
    }
  }

  login(){
    this.router.navigate(['screen/login']);
  }
}


