import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { members } from '../_models/members';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  membersList : any = [];
  members$: Observable<any[]>;

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
this.members$ = this.membersService.getMembers();
    //  this.loadMembers();
  }
    
//   loadMembers(){
//     this.membersService.getMembers().subscribe(members=>{
//     this.membersList = members;
//   })
// }

}
