import { IsNotEmpty } from "class-validator";

export class FindSubscriptionDTO {
	@IsNotEmpty()
	topicName: string;
    subscriptionName: string
}

export class CreateSubscriptionDTO {
	@IsNotEmpty()
	topicName: string;
    newSubscription: string
}

export class DeleteSubscriptionDTO {
	@IsNotEmpty()
	topicName: string;
    deleteSubscription: string
}