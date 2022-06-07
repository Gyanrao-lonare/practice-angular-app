import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from './home/default-page/default-page.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MembersComponent } from './members/members.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  // {path:'',component:HomeComponent},
  {path:'home',component:DefaultPageComponent, canActivate:[AuthGuard]},
  {path:'members',component:MembersComponent,canActivate:[AuthGuard]},
  {path:'members/:username',component:MemberDetailComponent,canActivate:[AuthGuard]},
  {path:'member/edit',component:MemberEditComponent,canActivate:[AuthGuard], canDeactivate:[PreventUnsavedChangesGuard]},
  {path:'list',component:ListComponent,canActivate:[AuthGuard] },
  {path:'messages',component:MessagesComponent,canActivate:[AuthGuard] },
  {path:'**',component:HomeComponent, pathMatch:'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
