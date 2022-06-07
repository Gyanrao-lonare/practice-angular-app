import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode = false;
users: any;
  constructor(private https:HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }
registerToggle(){
  this.registerMode = !this.registerMode
}
getUsers(){
this.https.get('http://localhost:3000/users').subscribe((response)=>{
  console.log(this.users)
  this.users = response 
})
}
cancelRegisterMode(event:boolean){
  this.registerMode = event;
}
}
