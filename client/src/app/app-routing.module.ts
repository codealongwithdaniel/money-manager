import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutComponent } from './about/about.component';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'screen/home',
    pathMatch: 'full'
  },
  {
    path: 'screen/home',
    component: HomeComponent
  },
  {
    path: 'screen/categories',
    component: CategoriesComponent
  },
  {
    path: 'screen/chart',
    component: ChartComponent
  },
  {
    path: 'screen/settings',
    component: SettingsComponent
  },
  {
    path: 'screen/feedback',
    component: FeedbackComponent
  },
  {
    path: 'screen/about',
    component: AboutComponent
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
