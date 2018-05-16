import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashBoardGraphInfoNode } from '../classes/generalstatistisc';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-dashboard-detail-graph',
  templateUrl: './dashboard-detail-graph.component.html',
  styleUrls: ['./dashboard-detail-graph.component.css']
})
export class DashboardDetailGraphComponent implements OnInit {

  @Input() name: string;
  private graphInfo: DashBoardGraphInfoNode;
  private chart : Chart;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
      this.route.params.subscribe( params => {
      this.name = params['name'];
      
      });

  }


  ngOnInit() {
    this.graphInfo = JSON.parse(localStorage.getItem('GRAPH_DATA_DETAIL'));
      
      if( this.graphInfo ){
        console.log("---------------------------->DETALLE ", this.name, this.graphInfo.data, this.graphInfo.graphConf  );
      }

      let backgroundColor = [];
      for (let i = 0; i < this.graphInfo.data.classes.length; i++) {
        let r = Math.floor(Math.random() * 200);
        let g = Math.floor(Math.random() * 200);
        let b = Math.floor(Math.random() * 200);
        let c = 'rgb(' + r + ', ' + g + ', ' + b + ')'; //Normal
        let h = 'rgb(' + (r+20) + ', ' + (g+20) + ', ' + (b+20) + ')'; //Hover
        backgroundColor.push(c);
      };


      let gphInfo= {
        //type: this.graphInfo.gType, // pie, line,  'bar',
        type: 'pie', // , line,  'bar',
        data: {
          labels: this.graphInfo.data.classes,
          datasets: [
            {
              label: this.graphInfo.data.fieldName,
              data: this.graphInfo.data.classCount,
              backgroundColor: backgroundColor,//"rgba(255,99,132,0.2)",
              //borderColor: "rgba(255,99,132,1)",
              //hoverColor : [],
              borderWidth: 1,
              fill: true
            }
          ]
        },

        options: {
          //rotation: -Math.PI/2,
          cutoutPercentage: 60,
          //circumference: Math.PI,
          legend: {
            position: 'left'
          },
          animation: {
            animateRotate: true,
            animateScale: true
          }
         /*  scales: {
            xAxes: [{
              display: true,
              categorySpacing: 0,
              maxBarThickness: 50,
              categoryPercentage: 1,
              barPercentage: 0.5,
              autoSkip: false
            }],
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: (this.graphsInfo[i].data.min - 1 < 0) ? 0 : this.graphsInfo[i].data.min - 1,
                max: this.graphsInfo[i].data.max,
              }
            }]
          } */
        }
      };
      //Colors for data set

     
      this.chart = new Chart( ('canvas'), gphInfo);
      
  }

  goBack(): void {
    //this.location.back();
    //this.router.navigate(['/kiuwan'], { relativeTo: this.route } );
    this.router.navigate(['/dashboard'] );
    
  }
}
