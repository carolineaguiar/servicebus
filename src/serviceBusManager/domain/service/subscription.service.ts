import { Inject, Injectable } from "@nestjs/common";
import { createSubscriptionEntity, deleteSubscriptionEntity, findSubscriptionEntity } from "../entities/subscription";
import { IMessagerie } from "./repositories/messagerie.interface";


@Injectable()

export class SubscriptionService {
    constructor(
        @Inject("MessageBroker")
		private readonly messageBroker: IMessagerie,
    ) {}

    public async findSubscription({ topicName, subscriptionName }: findSubscriptionEntity): Promise<any>{

        const subscription = await this.messageBroker.findSubscription(topicName, subscriptionName);
		return subscription;

    }

	public async createSubscription({ topicName, newSubscription }: createSubscriptionEntity): Promise<any>{

        const subscription = await this.messageBroker.createSubscription(topicName, newSubscription);
		return subscription;

    }

	public async deleteSubscription({ topicName, deleteSubscription }: deleteSubscriptionEntity): Promise<any>{

        const subscription = await this.messageBroker.deleteSubscription(topicName, deleteSubscription);
		return subscription;
    }
}