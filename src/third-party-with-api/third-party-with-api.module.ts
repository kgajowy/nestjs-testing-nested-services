import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ThirdPartyWithApiService } from './third-party-with-api.service';

@Module({
  imports: [HttpModule],
  providers: [ThirdPartyWithApiService],
  exports: [ThirdPartyWithApiService],
})
export class ThirdPartyWithApiModule {}
