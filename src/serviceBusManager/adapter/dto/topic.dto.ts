import { IsNotEmpty } from "class-validator";

export class FindTopicDTO {
	@IsNotEmpty()
	findTopic: string;
}

export class CreateTopicDTO {
	@IsNotEmpty()
	newTopic: string;
}

export class DeleteTopicDTO {
	@IsNotEmpty()
	deleteTopic: string;
}