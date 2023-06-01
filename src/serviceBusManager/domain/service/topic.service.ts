import { Inject, Injectable } from "@nestjs/common";
import { createTopicEntity, deleteTopicEntity, findTopicEntity } from "../entities/topic";
import { IMessagerie } from "./repositories/messagerie.interface";


@Injectable()

export class TopicService {
    constructor(
        @Inject("MessageBroker")
		private readonly messageBroker: IMessagerie,
    ) {}

    public async findTopic({ findTopic }: findTopicEntity): Promise<any>{

        const topic = await this.messageBroker.findTopic(findTopic);
		return topic;

    }

	public async createTopic({ newTopic }: createTopicEntity): Promise<any>{

        const topic = await this.messageBroker.createTopic(newTopic);
		return topic;

    }

	public async deleteTopic({ deleteTopic }: deleteTopicEntity): Promise<any>{

        const topic = await this.messageBroker.deleteTopic(deleteTopic);	
		return topic;

    }
}