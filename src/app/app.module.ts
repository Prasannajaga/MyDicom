import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ViewAllDicomComponent } from './view-all-dicom/view-all-dicom.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewAllDicomComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // DicomViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
