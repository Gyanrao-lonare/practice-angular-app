import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import {ToastrModule} from 'ngx-toastr';
import { MembersComponent } from './members/members.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { JwtInterceptor } from './_interseptors/jwt.interceptor';
import {TabsModule} from "ngx-bootstrap/tabs";
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { UserEditComponent } from './list/user-edit/user-edit.component';
import { UserAddComponent } from './list/user-add/user-add.component';
import { DefaultPageComponent } from './home/default-page/default-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interseptors/loading.interceptor';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';
import { ModalControlComponent } from './_bootsrapControls/modal-control/modal-control.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';
import { LineChartComponent } from './_charts/line-chart/line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GaugeChartComponent } from './_charts/gauge-chart/gauge-chart.component';
import { D3ChartComponent } from './_d3/d3-chart/d3-chart.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListComponent,
    MessagesComponent,
    MembersComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    UserEditComponent,
    UserAddComponent,
    DefaultPageComponent,
    TextInputComponent,
    DateInputComponent,
    PhotoEditorComponent,
    ModalControlComponent,
    LineChartComponent,
    GaugeChartComponent,
    D3ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,  //imported the module
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({positionClass:"toast-bottom-right"}),
    NgxGalleryModule,
    FileUploadModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    TimeagoModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    NgxChartsModule,  
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }