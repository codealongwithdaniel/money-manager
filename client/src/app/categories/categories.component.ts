import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categoryDetails: any = {};
  selectedIconObj: any = {};
  iconArr: any = [];
  constructor(private apiService: ApiService, private toastCtrl: ToastController) {
    this.getAllCategories()
  }

  ngOnInit() {}

  selectedIcon(iconObj){
    console.log(iconObj);
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
            this.iconArr = results.results.income.concat(results.results.expense);
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
  addCategory(){
    if(this.selectedIconObj.icon_name && this.categoryDetails.type && this.categoryDetails.name){
      const newCategory = {
        type: this.categoryDetails.type,
        name: this.categoryDetails.name,
        icon_name: this.selectedIconObj.icon_name
      }
      this.apiService.addCategory(newCategory)
      .then((observable: any)=>{
        observable.subscribe(async (results: any)=>{
          // console.log(results);
          if(results.success){
            const toast = await this.toastCtrl.create({
              position: 'top',
              message: 'Category added',
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
    }else{
      console.log(false);
    }
  }
}
