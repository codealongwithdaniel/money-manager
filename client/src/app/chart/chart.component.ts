import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild("expenseCanvas", {static: false}) expenseCanvas: ElementRef;
  @ViewChild("incomeCanvas", {static: false}) incomeCanvas: ElementRef;

  bars: any;
  colorArray: any;
  private expenseChart: Chart;
  private incomeChart: Chart;
  constructor() {

  }
  
  ionViewDidEnter() {
    this.createBarChart();
  }
  ngOnInit() {}

  createBarChart() {
    this.incomeChart = new Chart(this.incomeCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Salary", "Refunds", "Coupons", "Investments", "Awards", "Lottery"],
        datasets: [
          {
            label: "# of Votes",
            data: [25000, 190, 300, 5000, 250, 10000],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["rgb(255, 99, 132)", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });
    this.expenseChart = new Chart(this.expenseCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Food", "Electronics", "Travel", "Health", "Gift", "Social"],
        datasets: [
          {
            label: "# of Votes",
            data: [3000, 1900, 2500, 575, 1500, 800],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["rgb(255, 99, 132)", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });
  }
}
