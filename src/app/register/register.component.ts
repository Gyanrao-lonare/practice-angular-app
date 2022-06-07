import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHome:any
  @Output() cancelRegister = new EventEmitter();
  modal :any = {};
  modalDataErorr : any ={};
  registerForm :FormGroup;
  maxDate :Date;
  constructor(private accountServices : AccountService,private toastr:ToastrService,
    private fb : FormBuilder) { }
  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }
  initializeForm(){
    this.registerForm = this.fb.group({
      username: ['',Validators.required],
      knonAs: ['',Validators.required],
      dateOFBirth: ['',Validators.required],
      gender: ['male',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required,this.matchValues('password')]],
      email : ['',[Validators.required, Validators.email, ]],
      mobile : ['',[Validators.required , Validators.minLength(10), Validators.maxLength(10)]],
    })
this.registerForm.controls.confirmPassword.valueChanges.subscribe(()=>{
  this.registerForm.controls.password.updateValueAndValidity();
})
  }
  matchValues(matchTo:string):ValidatorFn{
    return(control:AbstractControl)=>{
      return control?.value === control?.parent?.controls[matchTo].value ? null :{isMaching : true}
    }
  }
  register(){
 console.log(this.registerForm.value);
    //   if(!this.modal.username){
  //     this.modalDataErorr["username"]="Username is required";
  //   }
  //   if(!this.modal.password){
  //     this.modalDataErorr["password"]="Password is required";
  //   }
  //   if(!this.modal.email){
  //     this.modalDataErorr["email"]="Email is required";
  //   }
  //   if(!this.modal.mobile){
  //     this.modalDataErorr["mobile"]="mobile is required";
  //   }
  //   if(this.modal.username && this.modal.password &&this.modal.email && this.modal.mobile){
  if(this.registerForm.status === "VALID"){
  this.accountServices.register(this.registerForm.value,"register").subscribe(responce=>{
       console.log(responce);
       this.toastr.success("register Succefully")
      
    })
  }
  // }
   
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
