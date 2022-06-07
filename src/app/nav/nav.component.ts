import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  modal: any = {};
  loggedInUser : any;
  constructor(public accountServecis: AccountService,private toastr:ToastrService) {}
  ngOnInit(): void {
   this.getCurrentUser();
  }
  login() {
    this.accountServecis.login(this.modal).subscribe(
      (response) => {
        console.log(response);
        // this.toastr.success("Login Succefully");
      },
      (error) => {
        console.log(error);
        this.toastr.error("Somthing Went Wrong!")
      }
    );
    console.log(this.modal);
  }
  logout() {
    this.accountServecis.logout();
    this.toastr.success("Loged Out succefully!")
  }
  getCurrentUser(){
    this.accountServecis.currentUser$.subscribe(user=>{
      this.loggedInUser = user;
    },error=>{
      console.log(error);
    })
  }
}
