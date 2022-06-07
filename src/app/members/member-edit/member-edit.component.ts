import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { members } from 'src/app/_models/members';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm:NgForm;
  member: any = [];
  user: any = [];
  // editForm: FormGroup;
  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user:any) => {
      if(user && user.length === 1){
      this.user = user;
      }else{
        this.user = [user];

      }
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }
  loadMember() {   
    let userID = JSON.parse(localStorage.getItem('user'));
    this.memberService.getMember(userID.id).subscribe((member) => {
      this.member = member;
    });
  }
  updateMember() {
    this.accountService.updateUser(this.member).subscribe((responce) => {
      if (responce) {
        this.toastr.success('Profile Update succefully');
        this.editForm.reset(this.member);
        
      }
    });
  }
}
