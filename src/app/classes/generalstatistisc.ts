import {Chart} from 'chart.js';



export class GeneralStatistisc {
  title: string;  // not used
  subtile: string;  // not used
  fieldName: string;
  dataValues: Object; // used to accumulate every class value finded
  /* Results: calculated data after complete the recolection*/
  classes: string[];  // Distinct values
  classCount: number[]; // Repetitions of values
  total: number;
  classPercent: number[];
  max: number = 0;
  min: number = 0;
  

  constructor() {
    this.dataValues = [];
    this.total = 0;
  }

  /*printData(): void {
    console.log("GeneralStatistisc.printData");
  }*/

  clearValues (){
    this.dataValues = [];
    this.total = 0;
    this.max = 0;
    this.min = 0;
  }
  // Add new value to the collection
  addValue(key): void {

    // console.log("GeneralStatistisc.addValue: " + key);
    if (this.dataValues[key]) {
      this.dataValues[key]++;
    } else {
      this.dataValues[key] = 1;
    }
    this.total++;
    //    console.log(" Result", this.dataValues);
  }

  makeCalcs(): void {
    console.log("---------------->makeCalcs", Object.keys(this.dataValues));
    this.classes = Object.keys(this.dataValues);
    this.classCount = Object.values(this.dataValues);
    this.max = 0; this.min = 0;
    for (let i = 0; i < this.classCount.length; i++) {
      if(this.classCount[i] > this.max ) {
         this.max = this.classCount[i];
      } else if(this.classCount[i] < this.min ) {
         this.min = this.classCount[i];
      }
    }
    console.log("  results = ", this );
  }
}


export class DashBoardGraphInfoNode {

  constructor() {
    this.graph = null; //  chart-js object
    this.title = '';
    this.subtitle = '';
    this.index = 0;
    this.graphConf = '';
    this.data = new GeneralStatistisc();
    this.gType = 'Bar';
  }

  graph: Chart = null;
  index: number;
  title: string;
  subtitle: string;
  data: GeneralStatistisc;
  gType: string; // Bar, Line
  graphConf: Object; // conf for Bar, Line etc
}
