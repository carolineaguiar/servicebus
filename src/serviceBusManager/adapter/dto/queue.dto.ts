import { IsNotEmpty } from "class-validator";

export class FindQueueDTO {
	@IsNotEmpty()
	findQueue: string;
}

export class CreateQueueDTO {
	@IsNotEmpty()
	newQueue: string;
}

export class DeleteQueueDTO {
	@IsNotEmpty()
	deleteQueue: string;
}