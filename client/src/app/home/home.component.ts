import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  date: any = moment().format('YYYY-MM-DD');
  public myDate;
  allRecords: any = [];
  constructor(private router: Router, private apiService: ApiService, private toastCtrl: ToastController) {
    this.getAllTransactions();
    console.log(this.date);
  }

  ngOnInit() {}
  
  valueChanged(event){
    // console.log(event.target.value.split('T')[0]);
    this.date = event.target.value.split('T')[0];
    this.getAllTransactions();
  }

  navigateToAddNew(){
    this.router.navigate(['screen/add']);
  }


  doRefresh(event){
    const data = {
      date: this.date
    }
    this.apiService.getAllTransaction(data)
    .then((observable: any)=>{
      observable.subscribe(async (results: any)=>{
        // console.log(results);
        if(results.success){
          this.allRecords = results.results;
          console.log(this.allRecords);
          event.target.complete();
        }else{
          const toast = await this.toastCtrl.create({
            position: 'top',
            message: 'Something went wrong',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
          event.target.complete();
        }
      });
    })
  }
  getAllTransactions(){
      const data = {
        date: this.date
      }
      this.apiService.getAllTransaction(data)
      .then((observable: any)=>{
        observable.subscribe(async (results: any)=>{
          // console.log(results);
          if(results.success){
            this.allRecords = results.results;
            console.log(this.allRecords);
          }else{
            const toast = await this.toastCtrl.create({
              position: 'top',
              message: 'Something went wrong',
              duration: 2000,
              color: 'danger'
            });
            toast.present();
          }
        });
      })
      // console.log(true);
    
  }
}
