import { Inject } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { HttpInterface } from '../../domain/service/repositories/http.interface';

export class AxiosService implements HttpInterface {
    constructor(
        @Inject("SERVICEBUS_ENDPOINT")
        private readonly stringConnect: string
    ) {}

    async get(item: any): Promise<any>{
        const url = `https://${this.stringConnect.split("/")[2]}/${item.queueName}/messages/${item.messageId};${item.sequenceNumber}/${item.lockToken}`;
        console.log(url)
        const auth = this.createSharedAccessToken("test-Carol.servicebus.windows.net","RootManageSharedAccessKey", "8g4EKr7yP55IGJJW6XHaRhG0aTmILHapekwvpZmr5to=" )
        console.log(auth)
        return axios.delete(url, {
            headers: {
              'Authorization': auth,
              'Host': 'test-carol.servicebus.windows.net'  
            }
          })
    }

    private createSharedAccessToken(uri, saName, saKey) { 
        if (!uri || !saName || !saKey) { 
                throw "Missing required parameter"; 
            } 
        const encoded = encodeURIComponent(uri); 
        const now = new Date(); 
        const week = 60*60*24*7;
        const ttl = Math.round(now.getTime() / 1000) + week;
        const signature = encoded + '\n' + ttl; 
        const signatureUTF8 =Buffer.from(signature, 'utf-8').toString();;
        const hash = crypto.createHmac('sha256', saKey).update(signatureUTF8).digest('base64'); 
        return 'SharedAccessSignature sr=' + encoded + '&sig=' +  
            encodeURIComponent(hash) + '&se=' + ttl + '&skn=' + saName; 
    }
}

