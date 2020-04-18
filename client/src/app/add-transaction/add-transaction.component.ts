import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
  transactionType: string = 'expense';
  iconArr: any[] = [];
  transactionDetails: any = {};
  incomeIconArr: any []
  expenseIconArr: any[];
  selectedIconObj: any = {}
  constructor(private apiService: ApiService, private toastCtrl: ToastController) {
    this.getAllCategories();
  }

  ngOnInit() {}

  valueChanged(event){
    if(event.target.value == 'income'){
      this.iconArr = this.incomeIconArr;
    }else{
      this.iconArr = this.expenseIconArr;
    }
  }

  selectedIcon(iconObj){
    // console.log(iconObj);
    this.selectedIconObj = iconObj;
  }

  getAllCategories(){
    this.apiService.getAllCategories()
      .then((observable: any)=>{
        observable.subscribe(async (results: any)=>{
          // console.log(results);
          if(results.success){
            // const toast = await this.toastCtrl.create({
            //   position: 'top',
            //   message: 'Category added',
            //   duration: 2000,
            //   color: 'success'
            // });
            // toast.present();
            this.incomeIconArr = results.results.income;
            this.expenseIconArr = results.results.expense;
            this.iconArr = this.expenseIconArr;
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
  }
  
  async addTransaction(){
    // console.log(this.transactionDetails);
    // console.log('Trans type', !this.transactionType);
    // console.log('Cat type', !this.selectedIconObj.id);
    // console.log('price', !this.transactionDetails.price);
    // console.log('date' , !this.transactionDetails.date);

    if(this.transactionType && this.selectedIconObj.id && this.transactionDetails.price && this.transactionDetails.date){
      const newTransaction = {
        type: this.transactionType,
        category_id: this.selectedIconObj.id,
        date: this.transactionDetails.date.split('T')[0],
        price: this.transactionDetails.price
      }
      this.apiService.addTransaction(newTransaction)
      .then((observable: any)=>{
        observable.subscribe(async (results: any)=>{
          // console.log(results);
          if(results.success){
            const toast = await this.toastCtrl.create({
              position: 'top',
              message: 'Record added',
              duration: 2000,
              color: 'success'
            });
            toast.present();
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
      console.log('Data', newTransaction);
      // console.log(true);
    }else{
      const toast = await this.toastCtrl.create({
        position: 'top',
        message: 'Please enter all details',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
