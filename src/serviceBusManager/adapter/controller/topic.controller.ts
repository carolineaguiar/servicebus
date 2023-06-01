import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
import { TopicService } from "../../domain/service/topic.service";
import { CreateTopicDTO, DeleteTopicDTO, FindTopicDTO } from "../dto/topic.dto";


@Controller()
export class TopicController {
    constructor(
        private readonly topicService: TopicService
    ) {}

    @Get('/topic')
    public async findTopic(@Query() findTopic: FindTopicDTO): Promise<void> {
        try{
            const topic = await this.topicService.findTopic(findTopic);
            return topic;
  
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }	
    }

    @Post('/topic')
    public async createTopic(@Body() newTopic: CreateTopicDTO): Promise<void> {
        try{
            const topic = await this.topicService.createTopic(newTopic);
            return topic;
  
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }	
    }

    @Delete('/topic')
    public async deleteTopic(@Body() deleteTopic: DeleteTopicDTO): Promise<void> {
        try{
            const topic = await this.topicService.deleteTopic(deleteTopic);
            return topic;
  
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }	
    }
}