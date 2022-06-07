import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  userList: any;
  filterUserList: any;
  tempUser: any;
  userEditMode: boolean = false;
  userAddMode: boolean = false;
  constructor(
    private https: HttpClient,
    private memberService: MembersService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.memberService.getUsers().subscribe((users) => { 
      this.userList = users;
      this.filterUserList = users;
    });
  }
  deleteUsers(id) {
    this.accountService.deleteUser(id).subscribe((resonce) => {
      if (resonce) {
        this.loadUsers();
      }
    });
  }
  getUser(id) {
    this.https
      .get('http://localhost:3000/users/' + id)
      .subscribe((responce) => {
        this.tempUser = responce;
        this.userEditMode = true;
      });
  }
cancelUpdate(e){
  this.userEditMode = false;
  this.loadUsers();

}
//  onChange(text){
   
//   let searchText = text.target.value;
//   const p = this.userList.from(searchText).reduce((a, v, i) => `${a}[^${searchText.substr(i)}]*?${v}`, '');
//   const re = p
  
//   return values.filter(v => v.match(re));
// };
resetSearch(text){
  this.filterUserList = this.userList;
}
onChange(text){
  debugger
  let searchText = text
  if(searchText){
let filterData = this.userList.filter(item=>{
 return (item.username.toLowerCase().indexOf(searchText.toLowerCase())>= 0 ||
 item.email.toLowerCase().indexOf(searchText.toLowerCase())>= 0 ||
 item.mobile.toLowerCase().indexOf(searchText.toLowerCase())>= 0 )
})
  this.filterUserList = filterData;
}else{
    this.filterUserList = this.userList;
  }
 }
cancelAddUser(e){
  this.userAddMode = false;
  this.loadUsers();

}
  updateUsers(id) {
    // this.accountService.deleteUser(id).subscribe(resonce=>{
    //   if(resonce){
    //     this.loadUsers();
    //   }
    // });
  }
}
