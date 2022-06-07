import { Component, Input, OnInit } from '@angular/core';
import { members } from '../_models/members';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() member : members;
  constructor() { }

  ngOnInit(): void {
  }

}
