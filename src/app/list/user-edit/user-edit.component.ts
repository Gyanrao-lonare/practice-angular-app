import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  @Input() userFromListComponent: any;
  @Output() cancelUpdate = new EventEmitter();
  modal: any;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {
    console.log('userFromListComponent', this.userFromListComponent);
  }

  ngOnInit(): void {}
  updateUser() {
    this.accountService.updateUser(this.userFromListComponent).subscribe((responce) => {
        if (responce) {
          this.toastr.success('User Updated Succefully');
          this.cancelUpdate.emit(false);
        }
      });
  }
  cancel() {
    this.cancelUpdate.emit(false);
  }
}
