import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
  transactionType: string = 'income';
  iconArr: any[] = [];
  incomeIconArr: any [] = [
    {
      iconName: 'cash-outline',
      name: 'Salary'
    },
    {
      iconName: 'trophy-outline',
      name: 'Rewards'
    },
    {
      iconName: 'card-outline',
      name: 'Coupons'
    },
    {
      iconName: 'gift-outline',
      name: 'Grants'
    },
    {
      iconName: 'nuclear-outline',
      name: 'Lottery'
    },
    {
      iconName: 'stats-chart-outline',
      name: 'Dividents'
    },
    {
      iconName: 'refresh-outline',
      name: 'Refunds'
    },
    {
      iconName: 'bar-chart-outline',
      name: 'Investments'
    },
    {
      iconName: 'apps-outline',
      name: 'Others'
    }
  ];
  expenseIconArr: any[] = [
    {
      iconName: 'fast-food-outline',
      name: 'Food'
    },
    {
      iconName: 'newspaper-outline',
      name: 'Bills'
    },
    {
      iconName: 'car-outline',
      name: 'Transportation'
    },
    {
      iconName: 'home-outline',
      name: 'Home'
    },
    {
      iconName: 'car-sport-outline',
      name: 'Car'
    },
    {
      iconName: 'game-controller-outline',
      name: 'Game'
    },
    {
      iconName: 'cart-outline',
      name: 'Shopping'
    },
    {
      iconName: 'shirt-outline',
      name: 'Clothing'
    },
    {
      iconName: 'shield-checkmark',
      name: 'Insurance'
    },
    {
      iconName: 'document-outline',
      name: 'Taxes'
    },
    {
      iconName: 'call-outline',
      name: 'Telephone'
    },
    {
      iconName: 'logo-no-smoking',
      name: 'Cigarette'
    },
    {
      iconName: 'medkit-outline',
      name: 'Health'
    },
    {
      iconName: 'ribbon',
      name: 'Sports'
    },
    {
      iconName: 'radio-outline',
      name: 'Electronics'
    },
    {
      iconName: 'wine-outline',
      name: 'Wine'
    },
    {
      iconName: 'gift-outline',
      name: 'Gift'
    },
    {
      iconName: 'people-circle-outline',
      name: 'Social'
    },
    {
      iconName: 'airplane-outline',
      name: 'Travel'
    },
    {
      iconName: 'library-outline',
      name: 'Education'
    },
    {
      iconName: 'link-outline',
      name: 'Office'
    },
    {
      iconName: 'apps-outline',
      name: 'Others'
    }
  ];
  constructor() {
    this.iconArr = this.incomeIconArr;
  }

  ngOnInit() {}

  valueChanged(event){
    console.log(event.target.value);
  }
}
