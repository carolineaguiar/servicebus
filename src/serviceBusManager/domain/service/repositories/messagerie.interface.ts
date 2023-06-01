import { ReceiveOptionsInterface } from "../../entities/receive-options";

export interface IMessagerie {
    findQueue: (name: string) => Promise<any>;
    createQueue: (name: string) => Promise<any>;
    deleteQueue: (name: string) => Promise<any>;
    findTopic: (name: string) => Promise<any>;
    createTopic: (name: string) => Promise<any>;
    deleteTopic: (name: string) => Promise<any>;
    findSubscription: (topicName: string, subscriptionName: string) => Promise<any>;
    createSubscription: (topicName: string, subscriptionName: string) => Promise<any>;
    deleteSubscription: (topicName: string, subscriptionName: string) => Promise<any>;
    sendMessage: (destinationName: string, message: any) => Promise<any>;
    receiveMessage: (queueName?: string, topicName?: string, subscriptionName?: string, option?: ReceiveOptionsInterface) => Promise<any>;
    deleteMessage: (item: any) => Promise<any>;
  }

  