import { Module } from '@nestjs/common';
import { MessageController } from './adapter/controller/message.controller';
import { QueueController } from './adapter/controller/queue.controller';
import { SubscriptionController } from './adapter/controller/subscription.controller';
import { TopicController } from './adapter/controller/topic.controller';
import { AxiosService } from './adapter/service/axios.service';
import { ServiceBusService } from './adapter/service/service-bus.service';
import { MessageService } from './domain/service/message.service';
import { QueueService } from './domain/service/queue.service';
import { SubscriptionService } from './domain/service/subscription.service';
import { TopicService } from './domain/service/topic.service';

@Module({
	controllers: [
        QueueController,
        TopicController,
        SubscriptionController, 
        MessageController
    ],
	providers: [
		QueueService,
        TopicService,
        SubscriptionService,
        MessageService,
        AxiosService,
		{
            provide: 'SERVICEBUS_ENDPOINT',
            useFactory: () => process.env.SERVICEBUS_ENDPOINT
        },
        {
            provide: 'MessageBroker',
            useClass: ServiceBusService
        },
        {
            provide: 'HttpRequest',
            useClass: AxiosService
        }
	],
})
export class ServiceBusManagerModule {}