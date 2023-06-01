import { ServiceBusClient, ServiceBusAdministrationClient } from '@azure/service-bus';
import { Inject, Injectable } from '@nestjs/common';
import { send } from 'process';
import {  IMessagerie } from 'src/serviceBusManager/domain/service/repositories/messagerie.interface';
import { IMessage } from '../repositories/service-bus.interface';
import { ReceiveOptionsInterface } from 'src/serviceBusManager/domain/entities/receive-options';

@Injectable()

export class ServiceBusService implements IMessagerie{
    constructor(
        @Inject("SERVICEBUS_ENDPOINT")
        private readonly stringConnect: string
    ) {}

    async findQueue(name: string): Promise<any> {
        if(!name) {
            throw new Error("Queue name is required")
        }
        const serviceBus = new ServiceBusAdministrationClient(
            this.stringConnect,
        );
        const queue = serviceBus.getQueue(name);
        return queue;
    }

    async createQueue(name: string): Promise<any> {
        if(!name) {
            throw new Error("Queue name is required")
        }
        const serviceBus = new ServiceBusAdministrationClient(
            this.stringConnect,
        );
        const queue = serviceBus.createQueue(name);
        return queue;
    }
      
    async deleteQueue(name: string): Promise<any> {
        if(!name) {
            throw new Error("Queue name is required")
        }
        const serviceBus = new ServiceBusAdministrationClient(
            this.stringConnect,
        );
        const queue = serviceBus.deleteQueue(name);
        return queue;
    }

    async findTopic(name: string): Promise<any> {
        if(!name) {
            throw new Error("Topic name is required")
        }
        const serviceBus = new ServiceBusAdministrationClient(
            this.stringConnect,
        );
        const topic = serviceBus.getTopic(name);
        return topic;
    }

    async createTopic(name: string): Promise<any> {
        if(!name) {
            throw new Error("Topic name is required")
        }
        const serviceBus = new ServiceBusAdministrationClient(
            this.stringConnect,
        );
        const topic = serviceBus.createTopic(name);
        return topic;
    }

    async deleteTopic(name: string): Promise<any> {
        if(!name) {
            throw new Error("Topic name is required")
        }
        const serviceBus = new ServiceBusAdministrationClient(
            this.stringConnect,
        );
        const topic = serviceBus.deleteTopic(name);
        return topic;
    }

    async findSubscription(topicName: string, subscriptionName: string ): Promise<any> {
        if(!topicName || !subscriptionName) {
            throw new Error("Topic and Subscription name are required")
        }
        const serviceBus = new ServiceBusAdministrationClient(
            this.stringConnect,
        );
        const subscription = serviceBus.getSubscription(topicName, subscriptionName);
        return subscription;
    }

    async createSubscription(topicName: string, subscriptionName: string ): Promise<any> {
        if(!topicName || !subscriptionName) {
            throw new Error("Topic and Subscription name are required")
        }
        const serviceBus = new ServiceBusAdministrationClient(
            this.stringConnect,
        );
        const createSubscription = serviceBus.createSubscription(topicName, subscriptionName);
        return createSubscription;
    }

    async deleteSubscription(topicName: string, subscriptionName: string ): Promise<any> {
        if(!topicName || !subscriptionName) {
            throw new Error("Topic and Subscription name are required")
        }
        const serviceBus = new ServiceBusAdministrationClient(
            this.stringConnect,
        );
        const deleteSubscription = serviceBus.deleteSubscription(topicName, subscriptionName);
        return deleteSubscription;
    }

    async sendMessage(destinationName: string, message: any): Promise<any> {
        console.log(destinationName);
        console.log(message)

        if(!destinationName || !message) {
            throw new Error("Queue/topic name and message are required")
        }
        const serviceBus = new ServiceBusClient(
            this.stringConnect
        )
        const messageSend: IMessage = {
            body: message
        }

        const sender = await serviceBus.createSender(destinationName).sendMessages(messageSend);	
        return sender;

    }

    async receiveMessage(queueName?: string, topicName?: string, subscriptionName?: string, option?: ReceiveOptionsInterface): Promise<any> {

        const serviceBus = new ServiceBusClient(
            this.stringConnect
        )
        
        if(queueName) {
            const receiver = serviceBus.createReceiver(queueName, option);
            const messagesReceived = await receiver.receiveMessages(10, {
                maxWaitTimeInMs: 3000
            });
            const messages = [];

            for (const message of messagesReceived) {
                console.log(message)
                messages.push({
                    body: message.body,
                    lockToken: message.lockToken,
                    messageId: message.messageId,
                    sequenceNumber: message.sequenceNumber
                })
            }
            
            await receiver.close();
            await serviceBus.close();
            return messages;
        }

        if(topicName && subscriptionName) {
            const receiver = await serviceBus.createReceiver(topicName, subscriptionName, option)
            const messagesReceived = await receiver.receiveMessages(10, {
                maxWaitTimeInMs: 1000
            });
            const messages = [];

            for (const message of messagesReceived) {
                messages.push(message);
            }
            
            await receiver.close();
            await serviceBus.close();
            return messages;
        }
    }

    async deleteMessage(item: any): Promise<any> {
        console.log(this.stringConnect);
        const url = `https://${this.stringConnect.split("/")[2]}/${item.queueName}/messages/${item.messageId}/${item.lockToken}`;
        return url;
    }
}