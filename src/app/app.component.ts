import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { d3Data } from './data';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import * as d3 from 'd3'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = ' The Dating App';
  users:any;
  public data = d3Data;
  private data12 = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}
private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(this.data12.map(d => d.Framework))
  .padding(0.2);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 200000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0,0)")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(this.data12)
  .enter()
  .append("rect")
  .attr("x", d => x(d.Framework))
  .attr("y", d => y(d.Stars))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.Stars))
  .attr("fill", "#d04a35");
}

  constructor(private http:HttpClient ,private accountService:AccountService){}
  ngOnInit() {
    this.getCurrentUser();
    //Draw Chart
    this.createSvg();
    this.drawBars(this.data);
  }

  getCurrentUser(){
    const user:User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
  
}
