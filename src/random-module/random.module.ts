import { Module } from '@nestjs/common';
import { ThirdPartyModule } from '../third-party/third-party.module';
import { RandomService } from './random.service';
import { ThirdPartyWithApiModule } from '../third-party-with-api/third-party-with-api.module';

@Module({
  imports: [ThirdPartyModule, ThirdPartyWithApiModule],
  providers: [RandomService],
  exports: [RandomService],
})
export class RandomModule {}
