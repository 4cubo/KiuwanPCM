export class KiuwanApplication {
  id: number;
  name: string;
  description: string;
  applicationProvider: string;
  applicationBusinessValue: string;
  applicationPortfolios: [{
    name: string;
    value: string
  }];

  DELIVERIES : KiuwanApplicationDelivery[];
  ANALISYS : KiuwanApplicationAnalisys[];

  //  Aditional fields
  _id: string; // Mongo id
  // Info extracted from portfolios
  _portfolio_Aplicacion: string;
  _portfolio_Business_Area: string;
  _portfolio_Cliente: string;
  _portfolio_Functional_Community: string;
  _portfolio_Main_Projet: string;
  _portfolio_Proyecto: string;
  _portfolio_Tecnologia: string;

  _isValidProyect: string; // Is a valid project for deployment plan (Implantación SAST Light - Kiuwan )


//  constructor(name: string) {
//    this.name = name;
//    
//  }

  public static explodeData(item: KiuwanApplication): void {

    item._portfolio_Aplicacion =
      (item.applicationPortfolios['Aplicacion']) ? item.applicationPortfolios['Aplicacion'] : null;
    item._portfolio_Business_Area =
      (item.applicationPortfolios['Business Area']) ? item.applicationPortfolios['Business Area'] : null;
    item._portfolio_Cliente =
      (item.applicationPortfolios['Cliente']) ? item.applicationPortfolios['Cliente'] : null;
    item._portfolio_Functional_Community =
      (item.applicationPortfolios['Functional Community']) ? item.applicationPortfolios['Functional Community'] : null;
    item._portfolio_Main_Projet =
      (item.applicationPortfolios['Main Projet']) ? item.applicationPortfolios['Main Projet'] : null;
    item._portfolio_Proyecto =
      (item.applicationPortfolios['Proyecto']) ? item.applicationPortfolios['Proyecto'] : null;
    item._portfolio_Tecnologia =
      (item.applicationPortfolios['Tecnologia']) ? item.applicationPortfolios['Tecnologia'] : null;
    
    item._isValidProyect = ( item._portfolio_Aplicacion && item._portfolio_Business_Area && item._portfolio_Cliente &&
                             item._portfolio_Functional_Community && item._portfolio_Main_Projet && item._portfolio_Proyecto &&
                             item._portfolio_Tecnologia ) ? 'S-SDLC' : 'POC';
  }

}



export class KiuwanApplicationAnalisys {
  code : string;
  label: string;
  creationDate: string;
  qualityModel: string;
  encoding: string;
  invoker: string;
  status: string;
  analysisScope: string;
  analysisProvider:string;
  unparsedFiles:[{
    file: string;
    cause: string
  }];
  analysisPortfolios: [{
    name: string;
    value: string
  }];
  metrics : [{
/*     'com.optimyth.CQM.defectsByPriority.Priority 1' : number;
    'com.optimyth.CQM.defectsByPriority.Priority 2' : number;
    'com.optimyth.CQM.defectsByPriority.Priority 3' : number;
    'com.optimyth.CQM.defectsByPriority.Priority 4' : number;
    'com.optimyth.CQM.defectsByPriority.Priority 5' : number; */
    'com.optimyth.CQM.securityDefectsByPriority.Priority 1' : number;
    'com.optimyth.CQM.securityDefectsByPriority.Priority 2' : number;
    'com.optimyth.CQM.securityDefectsByPriority.Priority 3' : number;
    'com.optimyth.CQM.securityDefectsByPriority.Priority 4' : number;
    'com.optimyth.CQM.securityDefectsByPriority.Priority 5' : number;
  }]
  
  _secRating : number;

  constructor(){
    console.log("---------------------------IIIIIIIIIIIIIIIIII--------->KiuwanApplicationAnalisys");
  }
}


export class KiuwanApplicationDelivery  extends KiuwanApplicationAnalisys {
  crstatus : string;
  changeRequest: string;
  changeRequestStatus: string;
  branchName: string;
  auditResult: string;
}
