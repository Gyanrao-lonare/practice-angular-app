import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  @Input() usersFromHome:any
  @Output() cancelRegister = new EventEmitter();
  modal :any = {};
  modalDataErorr : any ={}
  constructor(private accountServices : AccountService,private toastr:ToastrService) { }
  ngOnInit(): void {
  }
  register(){
    if(!this.modal.username){
      this.modalDataErorr["username"]="Username is required";
    }
    if(!this.modal.password){
      this.modalDataErorr["password"]="Password is required";
    }
    if(!this.modal.email){
      this.modalDataErorr["email"]="Email is required";
    }
    if(!this.modal.mobile){
      this.modalDataErorr["mobile"]="mobile is required";
    }
    if(this.modal.username && this.modal.password &&this.modal.email && this.modal.mobile){
    this.accountServices.register(this.modal,"Add").subscribe(responce=>{
      this.toastr.success("register Succefully")
      this.cancelRegister.emit(false); 
    })
  }
   
  }
  onMobileChange(e){
    if(e.length > 0){
      this.modalDataErorr["mobile"]=""
    }

  }
  onUsernameChange(e){
if(e.length > 0){
      this.modalDataErorr["username"]=""
    }
  }
  onPasswordChange(e){
    if(e.length > 0){
      this.modalDataErorr["password"]=""
    }
  }
  onEmailChange(e){
    if(e.length > 0){
      this.modalDataErorr["email"]=""
    }
  }
  cancel(){
    this.cancelRegister.emit(false);
  }

}
