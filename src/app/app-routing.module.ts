 import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllDicomComponent } from './view-all-dicom/view-all-dicom.component';

const routes: Routes = [

  // {path:":userId" , component:AppComponent},
  {path:"dicom", component: ViewAllDicomComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
