import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { ReceiveOptionsInterface } from "src/serviceBusManager/domain/entities/receive-options";

export class SendMessageDTO {
	@IsNotEmpty()
	destination: string;
	@IsNotEmpty()
	message: any;
}

export class ReceiveMessageDTO {
	@IsString()
	@IsOptional()
	queueName: string;
	@IsString()
	@IsOptional()
	topicName: string;
	@IsString()
	@IsOptional()
	subscriptionName?: string;
	@IsObject()
	@IsOptional()
	options: ReceiveOptionsInterface;
}

