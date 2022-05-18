import { Injectable } from '@nestjs/common';

@Injectable()
export class ThirdPartyService {
  doRequest(_id: string): Promise<string> {
    throw new Error(
      'I should not be called as I interact with external service.',
    );
  }
}
