import { Inject, Injectable } from "@nestjs/common";
import { createQueueEntity, deleteQueueEntity, findQueueEntity } from "../entities/queue";
import { IMessagerie } from "./repositories/messagerie.interface";


@Injectable()

export class QueueService {
    constructor(
        @Inject("MessageBroker")
		private readonly messageBroker: IMessagerie,
    ) {}

    public async findQueue({ findQueue }: findQueueEntity): Promise<any>{

        const queue = await this.messageBroker.findQueue(findQueue);
		return queue;

    }

	public async createQueue({ newQueue }: createQueueEntity): Promise<any>{

        const queue = await this.messageBroker.createQueue(newQueue);
		return queue;

    }

	public async deleteQueue({ deleteQueue }: deleteQueueEntity): Promise<any>{
			
        const queue = await this.messageBroker.deleteQueue(deleteQueue);
		return queue;

    }
}