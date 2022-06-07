import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import {filter, map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseurl = environment.apiUrl
  private currentUserSource = new ReplaySubject
  currentUser$ = this.currentUserSource.asObservable(); 
  user : any;
  constructor(private https:HttpClient, private router:Router,private toastr:ToastrService) { }
  login(modal:any){
    return this.https.get(this.baseurl + 'users').pipe(
      map((response : [])=>
      {
        const user:any = response;
        if(user.length > 0){
        var username1 = user.filter(function(node) {
          return node.username === modal.username;
      });
      var password1 = user.filter(function(node) {
        return node.password === modal.password;
    });
    }      
      if(username1.length > 0 ){
        if(password1.length > 0){         
         localStorage.setItem('user',JSON.stringify(username1[0]));
         this.currentUserSource.next(username1[0]);
         this.toastr.success("Login succefully");
         this.router.navigateByUrl("/home");     
    }else{
          this.toastr.error("Password not match")
        }
      }else{
        this.toastr.error("username is not available");
      }
    //  let  username = user.filter((item)=> item.username === modal.username);   
      }
      )
    )
  }
  setCurrentUser(user:User){
   this.currentUserSource.next(user);
  }
  register(modal:any,type:string){
    return this.https.post(this.baseurl + 'users',modal).pipe(
      map((response : User)=>
      {
      const user = response;
      
      if(user && type==="register"){
       localStorage.setItem('user',JSON.stringify(user));
       this.currentUserSource.next(user);
       this.router.navigateByUrl("/home"); 
      }else{
        this.router.navigateByUrl("/list"); 
      }
    }
      )
    )

  }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('');
  }
  deleteUser(id:any){
    return this.https.delete(this.baseurl+"users/" + id).pipe(
      map((resonce)=>{
        this.toastr.success("Record Delete Succefully");
       return resonce
      })
    )
  }
  getUser(user) {
        this.user = user;
  }
  updateUser(modal:any){
    return this.https.put(this.baseurl + 'users/' + modal.id, modal).pipe(
      map((response:any)=>{
        return response
      })
    )

  }
}
