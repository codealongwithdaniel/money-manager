import { Component, OnInit } from '@angular/core';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { NavigationBar } from '@ionic-native/navigation-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/screen/home',
      icon: 'home'
    },
    {
      title: 'Chart',
      url: '/screen/chart',
      icon: 'podium'
    },
    {
      title: 'Categories',
      url: '/screen/categories',
      icon: 'apps'
    },
    {
      title: 'Export',
      url: '/screen/export',
      icon: 'send'
    },
    {
      title: 'Settings',
      url: '/screen/settings',
      icon: 'settings'
    },
    {
      title: 'Feedback',
      url: '/screen/feedback',
      icon: 'mail'
    },
    {
      title: 'About',
      url: '/screen/about',
      icon: 'information-circle'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    // let status bar overlay webview
    // this.statusBar.overlaysWebView(true);

    // set status bar to white
    // let autoHide: boolean = true;
    // this.navigationBar.setUp(autoHide);
    this.statusBar.backgroundColorByHexString('#ffffff');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  onClick(event){
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
    }
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');		
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
