import { Component, OnInit } from '@angular/core';
import { d3Data } from 'src/app/data';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css']
})
export class DefaultPageComponent implements OnInit {
  data : any = d3Data; 

  constructor() { }

  ngOnInit(): void {
  }

}
