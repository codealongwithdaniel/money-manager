import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild("expenseCanvas", {static: false}) expenseCanvas: ElementRef;
  @ViewChild("incomeCanvas", {static: false}) incomeCanvas: ElementRef;
  date: any = moment().format('YYYY-MM-DD');
  bars: any;
  colorArray: any;
  private expenseChart: Chart;
  private incomeChart: Chart;
  constructor(private apiService: ApiService, private toastCtrl: ToastController) {
    this.getChartData()
  }
  
  ionViewDidEnter() {
    // this.createBarChart();
  }
  ngOnInit() {}

  returnLabels(el){
    return el.name
  }

  returnData(el){
    return el.total_price
  }

  returnbgColor(el){
    return el.colorAlpha
  }

  returnHoverColor(el){
    return el.colorCode
  }

  createBarChart(data) {
    this.incomeChart = new Chart(this.incomeCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: _.flatMap(data.incomeChart, this.returnLabels),
        datasets: [
          {
            label: "# of Votes",
            data: _.flatMap(data.incomeChart, this.returnData),
            backgroundColor: _.flatMap(data.incomeChart, this.returnbgColor),
            hoverBackgroundColor: _.flatMap(data.incomeChart, this.returnHoverColor)
          }
        ]
      }
    });
    this.expenseChart = new Chart(this.expenseCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: _.flatMap(data.expenseChart, this.returnLabels),
        datasets: [
          {
            label: "# of Votes",
            data: _.flatMap(data.expenseChart, this.returnData),
            backgroundColor: _.flatMap(data.expenseChart, this.returnbgColor),
            hoverBackgroundColor: _.flatMap(data.expenseChart, this.returnHoverColor)
          }
        ]
      }
    });
  }

  getChartData(){
    const data = {
      date: this.date
    }
    this.apiService.getChartData(data)
    .then((observable: any)=>{
      observable.subscribe(async (results: any)=>{
        console.log(results);
        if(results.success){
          if(!results.results.expenseChart.length && !results.results.incomeChart.length){
            console.log(true)
            const toast = await this.toastCtrl.create({
              position: 'top',
              message: 'No expense or income record found in the current month',
              duration: 2000,
              color: 'warning'
            });
            toast.present();
          }else if(!results.results.incomeChart.length){
            const toast = await this.toastCtrl.create({
              position: 'top',
              message: 'No income record found in the current month',
              duration: 2000,
              color: 'warning'
            });
            toast.present();
          }else if(!results.results.expenseChart.length){
            const toast = await this.toastCtrl.create({
              position: 'top',
              message: 'No expense record found in the current month',
              duration: 2000,
              color: 'warning'
            });
            toast.present();
          }
          // const toast = await this.toastCtrl.create({
          //   position: 'top',
          //   message: 'Record added',
          //   duration: 2000,
          //   color: 'success'
          // });
          // toast.present();
          // console.log(_.flatMap(results.results.expenseChart, this.returnData))
          this.createBarChart(results.results);
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
  valueChanged(event){
    // console.log(event.target.value.split('T')[0]);
    this.date = event.target.value.split('T')[0];
    this.getChartData();
  }
  doRefresh(event){
    const data = {
      date: this.date
    }
    this.apiService.getChartData(data)
    .then((observable: any)=>{
      observable.subscribe(async (results: any)=>{
        console.log(results);
        if(results.success){
          if(!results.results.expenseChart.length && !results.results.incomeChart.length){
            console.log(true)
            const toast = await this.toastCtrl.create({
              position: 'top',
              message: 'No expense or income record found in the current month',
              duration: 2000,
              color: 'warning'
            });
            toast.present();
          }else if(!results.results.incomeChart.length){
            const toast = await this.toastCtrl.create({
              position: 'top',
              message: 'No income record found in the current month',
              duration: 2000,
              color: 'warning'
            });
            toast.present();
          }else if(!results.results.expenseChart.length){
            const toast = await this.toastCtrl.create({
              position: 'top',
              message: 'No expense record found in the current month',
              duration: 2000,
              color: 'warning'
            });
            toast.present();
          }
          // console.log(_.flatMap(results.results.expenseChart, this.returnData))
          this.createBarChart(results.results);
          event.target.complete();
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
}
