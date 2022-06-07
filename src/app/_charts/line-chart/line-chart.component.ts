import { Component, OnInit } from '@angular/core';  
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  bubbleData: any[]=
  [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "x": 40632,
          "y": 80.3,
          "r": 80.4
        },
        {
          "name": "2000",
          "x": 36953,
          "y": 80.3,
          "r": 78
        },
        {
          "name": "1990",
          "x": 31476,
          "y": 75.4,
          "r": 79
        }
      ]
    },
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "x": 49737,
          "y": 78.8,
          "r": 310
        },
        {
          "name": "2000",
          "x": 45986,
          "y": 76.9,
          "r": 283
        },
        {
          "name": "1990",
          "x": 3706,
          "y": 75.4,
          "r": 253
        }
      ]
    },
    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "x": 36745,
          "y": 81.4,
          "r": 63
        },
        {
          "name": "2000",
          "x": 34774,
          "y": 79.1,
          "r": 59.4
        },
        {
          "name": "1990",
          "x": 29476,
          "y": 77.2,
          "r": 56.9
        }
      ]
    },
    {
      "name": "United Kingdom",
      "series": [
        {
          "name": "2010",
          "x": 36240,
          "y": 80.2,
          "r": 62.7
        },
        {
          "name": "2000",
          "x": 32543,
          "y": 77.8,
          "r": 58.9
        },
        {
          "name": "1990",
          "x": 26424,
          "y": 75.7,
          "r": 57.1
        }
      ]
    }
  ];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Years';
  maxRadius: number = 20;
  minRadius: number = 5;
  yScaleMin: number = 70;
  yScaleMax: number = 85;
boxChartData:any = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  }
]
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  public lineChartData: any[] = [
    { data: [61, 59, 80, 65, 45, 55, 40, 56, 76, 65, 77, 60], label: 'Apple' },
    { data: [57, 50, 75, 87, 43, 46, 37, 48, 67, 56, 70, 50], label: 'Mi' },
  ];
  
  public lineChartLabels: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
  public lineChartOptions = {
    responsive: true,
  };
     
  public lineChartLegend = true;
  public lineChartType:any = 'line';
  public lineChartPlugins = [];
    
  constructor() { }
   
  ngOnInit() {
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  onClick(chart){
    debugger
    this.bubbleData = this.boxChartData;

  }
}