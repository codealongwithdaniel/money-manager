import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  date: any;
  public myDate;
  ngOnInit() {}
  
  valueChanged(event){
    console.log(event.target.value.split('T')[0]);
  }

  navigateToAddNew(){
    this.router.navigate(['screen/add']);
  }
}
