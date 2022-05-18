import { Injectable } from '@nestjs/common';
import { ThirdPartyService } from '../third-party/third-party.service';
import { ThirdPartyWithApiService } from '../third-party-with-api/third-party-with-api.service';

@Injectable()
export class RandomService {
  constructor(
    private readonly thirdParty: ThirdPartyService,
    private readonly thirdPartyWithApi: ThirdPartyWithApiService,
  ) {}

  doStuff(id: string) {
    return this.thirdParty.doRequest(id);
  }

  doStuffWithApi(id: string): Promise<unknown> {
    return this.thirdPartyWithApi.doRequest(id);
  }
}
