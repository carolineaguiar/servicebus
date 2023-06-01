import { Inject, Injectable } from "@nestjs/common";
import { ReceiveMessageEntity, sendMessageEntity } from "../entities/message";
import { HttpInterface } from "./repositories/http.interface";
import { IMessagerie } from "./repositories/messagerie.interface";


@Injectable()

export class MessageService {
    constructor(
        @Inject("MessageBroker")
		private readonly messageBroker: IMessagerie,
        @Inject("HttpRequest")
		private readonly httpRequest: HttpInterface,
    ) {}

    public async sendMessage( messages: sendMessageEntity): Promise<any>{

        const destination = messages.destination;

            const send = await this.messageBroker.sendMessage(destination, messages);
            return send;
        
    }

    public async receiveMessage( receive: ReceiveMessageEntity): Promise<any>{

        const received = await this.messageBroker.receiveMessage(receive.queueName, receive.topicName, receive.subscriptionName, receive.options);
		return received;
    }

    public async deleteMessage( deleteMessage: any): Promise<any>{

        const deleted = await this.httpRequest.get(deleteMessage);
		return deleted;
    }
}