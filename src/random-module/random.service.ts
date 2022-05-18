import { Injectable } from '@nestjs/common';
import { ThirdPartyService } from '../third-party/third-party.service';

@Injectable()
export class RandomService {
  constructor(private readonly thirdParty: ThirdPartyService) {}

  doStuff(id: string) {
    return this.thirdParty.doRequest(id);
  }
}
