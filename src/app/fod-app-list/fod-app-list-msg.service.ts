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
    this.status.token = "AAEAAHOmIlrWPHUav6b2rGapKOQnOoLbImvd3dTDRhcipcdfU4o4jvnURCII0ZQ0xIwqNB3C3jbTji0gjdokQAQwafZ-yemplucSDL4WLl42ytb8mrJUwBqDFkxTeHaKs9s_-vi8RAaQu9foDvs0gslbTWpsqr2XIQ7EVX21s1Vk5wvR6ri6TeQdXP3ZCP4FCxCTlgrH8NvAhEZa9dPO5JxJ4bVHQ_3aGL7QkLqMxU2dBfsdlrUA15rlJ6_ihVKYbXVylSHbescV6DsamLGDEk1C-WMVP_a0Qtwm4AuAdKwQczEoD4Jia13PIkAlxJQc-yVaRidCa0QLEUiLrpkUwkPvke9UAwAAAAEAAGbG_4kSNi2LoC2hpj_sG8NOBFl4UaVpw1ZkVfSj7ngO31uS96wRvOGOY42Aa7wjNMR3J11FbjWnlPG9jIhnRBLrJO5I1phHuKVVQd2UL6t3TDj7Wfqcn7OTgORkMs0xK-SA91SIZ_6wkbAd1EDlZ5D0iwq6rcfp-72rCBt-VOPrp5uMjWXbc9iwSbH-D9U0D8CIkljLKT4IOznIFrHK92TQXs4kwOYDaXxCpK-_DG-bQ3EtHqXIN75JbXppXEV2fCr46_Kp00E0AzXSEcpAGvCfRMBMz8gFsmp_GCarVvi93d6nYWaMY6PVvBvmiXsole2QucEoxpgl9_DCUgnLs7zYq7iw0wLvBTH2JLs-k6_yNrwEiK9MRQpTJDgmWAH4YuKDioJ41wppzelyi4XBTPc---xH3XmdswrLOJq6c0pIW4WtnXEG36e2VTygs2p7IelaTUPDNJvvfQL0fx55XmHGEoxb7Psnaf_g5N2Bx2_BFo_Nbg4wDNF_Ugi69CCAckkKxsDA-iVxh12BhUm0fYzc01xS_oPIiFWZB8T2TbDBbs-F8jL9GrvwftrtSZZtq_mO9cdBINgIKQc8zfkEfqbiZ_fl4HL3NSt-gd6yfI18aAraCCm-KjfWVXQu2LDMv7pQrbHlGlD5HBK3ZA7WUJ__POoc7TiO15AEcpFhi40DNzmVU8AQUjM6z8S-fUKirpGNpLxoC0d2ErZYwY-xPkiozhXh3V915XkFqNgwbsE7vKseJlmGRuLWfSTHDHVkinjPJz_e_GNYcEEmDzHGImDPpVlw1p8VUYG5Cwxo13AmeiRN6enUuRV0c9d7SES4cLZlrC6UT8tbaoAOF2p-K_bCCH0ArunPSweecl26jlBbyeJTmE9rWRvM1DXJT353kQKxs7vXsH9mur6-Q7qyV_RlAJmyZHStivGXgeGRipDYakOB934d9A2nyT_S3fs8y0wBJYwhR-P1PJiMKLEaozk4yuL6HDM4ZknpK2AFpTjUJLYLoQJ-G8vpDzF3k1uckneZyYKR57D5STaj6ZAii_L9ypdtdZeu5HWIiUfcwNIWK0Cf6ELTUZY9FIzINIAxNlJ4SWI68ixwIo06oNTKRxI2KS4PAqCWd18wF69b7Pf4";
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
