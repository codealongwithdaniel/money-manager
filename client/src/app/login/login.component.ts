import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SigninDetails } from '../types/signinDetails';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userDetails: SigninDetails = {
    email: '',
    password: ''
  };
  constructor(private router: Router, private toastCtrl: ToastController, private apiService: ApiService, public storage: Storage) { }

  ngOnInit() {
  }


  async login(){
    if((this.userDetails.password.length >= 5) && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userDetails.email)){
      // console.log('true');
      this.apiService.loginUser(this.userDetails)
      .subscribe(async (results: any)=>{
        console.log(results);
        if(results.success){
          this.storage.set('token', results.token);
          // this.storage.get('token')
          // .then((val) => {
          //   console.log('Your token is', val);
          // });
          this.router.navigate(['screen/home']);
          // console.log('Token ',results.token);
        }else{
          const toast = await this.toastCtrl.create({
            position: 'top',
            message: 'Something went wrong',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
          return false;
        }
      })
    }else{
      const toast = await this.toastCtrl.create({
        position: 'top',
        message: 'Please enter valid details',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
