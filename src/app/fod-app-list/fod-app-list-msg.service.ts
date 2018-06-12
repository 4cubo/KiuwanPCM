import { Injectable } from '@angular/core';

@Injectable()
export class FodAppListMsgService {
  status : FoDStatus;
  messages: string[] = [];

  constructor(){
    this.status = new FoDStatus();
    this.status.error = false;
    this.status.errorString = "";
    this.status.totalCount = null;
    this.status.loadedCount = null;
    this.status.token = "AAEAAJkutPjPqQ6mmz0CU1Ip2xIXLA9MkTACZXhvSqGxPDHibKI3NQjhdaLnDcqlVbu6rjq-GNNq9phqHyMfk_5dH7nTSimgTOAUEQX-7PlqFRe6ritEwK0xFACNwhNsH9KNvMf6v4y5Gn25LSLijkfk5B2BTXIf1Qgz43a8AjZ-Xna8W-bO-6vZAmRrLxxQUroXE5T1igUh61PlrldLClFGdrPVSVHniNnr_k8i2cbdrHjLTHEggdIp24PmLxF252dCPgyxK667WQ7o7aInl5utGNl2X_zN9dyKB1YPZ4KDgUUfMt8moK8j0aY3O3H_eUz3HCau9bEPMdcoH3d8zlWT5AZUAwAAAAEAAGYRLWyYeGJs78W7id53olumRYC4cDtSP__O5f-fiQSTU7I2lzv8NLyII3M10usilWabTyQCF7Xa99Zrf_n1kdFLn-6e8Pzr1bPbx80D60t9ILUTsBpQYzqo9hZIInzjctlyLsFHPmuxtRaa27rEAd0zWs4pPdidZbIDjqpOk4Gui1KTgRiMqKwU3XCI1AX7R5UDgTFq-RjRSG0oE1DDCBzIHfpHNYGy1APtGlrXdJroDbkIhPWi6drDDg8yYjDRe9ysoB50opNBReG37RCwl0xlPImiUmpB-d-y4_3I6O_Acq6D7zI6C3ioVLFS9DUahTyUafjMss-VopAuoutYpLc4_jECHnDl1-JHSTIxwqYYF6diGXArocBupObbsLFGrPQKA-8i0Zxava_yjzChT8Vzwz4Gp0MH7SKXgYYOpRBXo7iJEe4bybgFENqb399lJN5wX0OW8VEPDh-HlMTgcYRScBTlQnFjxDlhF4J_0X7U5BX2JElsOQvMHjWAnZ-VE_mU15hiX4l5jYMkUhwHRRF0Krfq0KDA0VHOtHcSJmv0lMfWorGmpsZoOdVwPL5FoJChn1CwHRB-usxgnPyJ4rWhnpyV2HtJU45ubn7YDrWwz7-u9lw3WQCHOXOcfxB6GbWyYkI64f69IerpO8kkuoYIAPWvnSvb2ImFo-TRbf5Wx42AmumO-ndBShbZe7sb_mCw-OE5E3_p-XzUju9m0JySl697hA2g4FQmV88rPF_Ww--CSOEJ-xjB6m-El7R97c-NPdaObCGsc5ROwhmQJlVFxE-ge9sm_qaBTIBFuE2SJxWuOmF3FmUz92YJ-uPra09slsTyIya5grqPRV2Bu9mrtrG1dwmdnNClyYMatttOs9mkeXgExxdrjqJ5ZgUBi_pqfzM-4NFv3qk8BzGEl_yAhVjYwAbN0AU1rZgYg39uXVgRjWFXJGwhgFtxHZl7fMkfaZJViMYk8CtVKGbC59amFRrvR1wH9FeHDXKDTWeqzyBVaEATKQLB4KPoCHCKIGSC6_X952QZgVzxTCE_jjErcFV-KLQesiV8-zjbI6Q_f8edS2haw-Pk_XCkYUGuSm6dAkSCcepXBt-lGYnRHlwge-D1tKgPKV50qBLXNPf0";
  }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
  
}


export class FoDStatus {
  error  : boolean;
  errorString : string;
  totalCount : number;
  loadedCount : number;
  token : string;
}
