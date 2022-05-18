import { Module } from '@nestjs/common';
import { ThirdPartyModule } from '../third-party/third-party.module';
import { RandomService } from './random.service';

@Module({
  imports: [ThirdPartyModule],
  providers: [RandomService],
  exports: [RandomService],
})
export class RandomModule {}
