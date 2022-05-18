import { Module } from '@nestjs/common';
import { RandomModule } from './random-module/random.module';

@Module({
  imports: [RandomModule],
})
export class AppModule {}
