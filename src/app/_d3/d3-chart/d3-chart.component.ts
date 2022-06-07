import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.css']
})
export class D3ChartComponent implements OnInit {
  @Input() public data: { value: number, date: string }[];
  private width = 700;
private height = 700;
private margin = 50;
public svg;
public svgInner;
public yScale;
public xScale;
public xAxis;
public yAxis;
public lineGroup;
  constructor(public chartElem: ElementRef) { }

  ngOnInit(): void {
  }

}
