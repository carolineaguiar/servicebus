import { AmqpAnnotatedMessage } from '@azure/core-amqp';

import { ReceiveOptionsInterface } from "./receive-options";

export class sendMessageEntity {
	destination: string;
	message: any
}

export class ReceiveMessageEntity {
	queueName?: string;
	topicName?: string;
	subscriptionName?: string;
	options?: ReceiveOptionsInterface;
}

export interface ReceivedMessageInterface {
	readonly lockToken?: string;
	readonly deliveryCount?: number;
	readonly enqueuedTimeUtc?: Date;
	readonly expiresAtUtc?: Date;
	lockedUntilUtc?: Date;
	readonly enqueuedSequenceNumber?: number;
	readonly sequenceNumber?: number;
	readonly deadLetterSource?: string;
	readonly state: "active" | "deferred" | "scheduled";
	readonly _rawAmqpMessage: AmqpAnnotatedMessage;
}