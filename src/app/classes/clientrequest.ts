export class ClientRequest {
  id: number;
  fecha: Date;
  description: string;
  reponsable: {
    uid: string;
    firstName: string;
    lastName: string; 
  };

}
