import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ThirdPartyWithApiService {
  constructor(private readonly httpService: HttpService) {}
  async doRequest(_id: string): Promise<string> {
    // for brevity, skip parsing/validation
    return (
      await lastValueFrom(
        this.httpService.get('https://jsonplaceholder.typicode.com/todos', {
          validateStatus: () => true,
        }),
      )
    ).data;
  }
}
