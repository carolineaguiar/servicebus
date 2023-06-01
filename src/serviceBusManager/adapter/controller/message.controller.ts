import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { MessageService } from "../../domain/service/message.service";
import { ReceiveMessageDTO, SendMessageDTO } from "../dto/message.dto";
import { AxiosService } from "../service/axios.service";

@Controller()
export class MessageController {
	constructor(
		private messageService: MessageService,
		private axiosService: AxiosService,
	) {}
	

	@Post("/sendMessage")
	public async sendMessage(@Body() send: SendMessageDTO): Promise<void> {
		try{
			const sendMessage = await this.messageService.sendMessage(send);
			return sendMessage;
		} catch(error){

			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}	
	}

	@Post("/consumeMessage")
	public async consumeMessage(@Body() receiver: ReceiveMessageDTO): Promise<void> {
		try{
			const receiveMessage = await this.messageService.receiveMessage(receiver)
			return receiveMessage;
		} catch(error){

			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}

	}

	@Delete("/deleteMessage")
	public async deleteMessage(@Body() item: any): Promise<void> {
		try{
			return this.messageService.deleteMessage(item);
		} catch (error){

		}
	}
}