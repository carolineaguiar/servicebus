import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
import { QueueService } from "../../domain/service/queue.service";
import { CreateQueueDTO, FindQueueDTO, DeleteQueueDTO } from "../dto/queue.dto";


@Controller()
export class QueueController {
    constructor(
        private readonly queueService: QueueService
    ) {}

    @Get('/queue')
    public async findQueue(@Query() findQueue: FindQueueDTO): Promise<void> {
        try{
            const queue = await this.queueService.findQueue(findQueue);
            return queue;
  
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }	
    }

    @Post('/queue')
    public async createQueue(@Body() newQueue: CreateQueueDTO): Promise<void> {
        try{
            if(!newQueue) {
                throw new Error("Queue name are required");
            }
            const queue = await this.queueService.createQueue(newQueue);
            return queue;
  
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }	
    }

    @Delete('/queue')
    public async deleteQueue(@Body() deleteQueue: DeleteQueueDTO): Promise<void> {
        try{
            if(!deleteQueue) {
                throw new Error("Queue name are required");
            }
            const queue = await this.queueService.deleteQueue(deleteQueue);
            return queue;
  
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }	
    }
}

