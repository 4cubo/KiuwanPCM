export enum SASTRequest_Status {
  registered = 1,
  kiuwan_created = 2,
  fortify_created = 3
}

export class SASTRequest_OS {
  F_NAM: string;
  F_OSI: string;
  F_OST: string;
}

export class SASTRequest_LabUser {
  LAB_UID: string;
  LAB_EMA: string;
  LAB_UFN: string;
  LAB_USN: string;
}

export class SASTRequest {
  _id: string;

  P_PROV: string;
  PM_UID: string;
  PM_EMA: string;
  PM_FN: string;
  PM_LN: string;
  PM_BA: string;
  PM_FC: string;
  P_APP: string;
  P_PRO: string;
  P_DES: string;
  P_CLI: string;
  P_T1: string;
  P_T2: string;
  P_T3: string;
  P_NUMTEC: number;
  FACTORY_DATA: boolean;
  soData: [SASTRequest_OS];
  LABUSER_DATA: boolean;
  labUsersData: [SASTRequest_LabUser];
  __subAppNameList: [string];
  __subAppNameList2: [string];
  __factoriesNameList: [string];
  __osList: [string];
  __techList: [string];
  name: string;
  size: number;
  curSASTId: string;
  
  registered: Date;
  status: SASTRequest_Status;
  user: string;
  
}