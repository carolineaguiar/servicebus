import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
import { SubscriptionService } from "../../domain/service/subscription.service";
import { CreateSubscriptionDTO, DeleteSubscriptionDTO, FindSubscriptionDTO } from "../dto/subscription.dto";


@Controller()
export class SubscriptionController {
    constructor(
        private readonly subscriptionService: SubscriptionService
    ) {}

    @Get('/subscription')
    public async findSubscription(@Query() subscription: FindSubscriptionDTO): Promise<void> {
        try{
            console.log(subscription)
            const topic = await this.subscriptionService.findSubscription(subscription);
            return topic;
  
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }	
    }

    @Post('/subscription')
    public async createSubscription(@Body() subscription: CreateSubscriptionDTO): Promise<void> {
        try{
            const topic = await this.subscriptionService.createSubscription(subscription);
            return topic;
  
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }	
    }

    @Delete('/subscription')
    public async deleteSubscription(@Body() subscription: DeleteSubscriptionDTO): Promise<void> {
        try{
            const topic = await this.subscriptionService.deleteSubscription(subscription);
            return topic;
  
        } catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }	
    }

}