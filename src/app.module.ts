import { Module } from '@nestjs/common';
import { ServiceBusManagerModule } from './serviceBusManager/serviceBusManager.module';

@Module({
  imports: [ServiceBusManagerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
