import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";

import { MessageService } from "../../../../src/serviceBusManager/domain/service/message.service";
import { sendMessageEntity } from "../../../../src/serviceBusManager/domain/entities/message";

import chai = require("chai");
import sinon = require("sinon");
const expect = chai.expect;

describe("Message Service", () => {

    let messageService: MessageService;
    let testingModule: TestingModule;

	const message: sendMessageEntity = {
		destination: "anyDestination",
        message: "anyMessage"
	};

	const stubMessage: any = {
		findQueue: ""
	};

    beforeEach(async () => {
		testingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
					MessageService,

                {
                    provide: "MessageBroker",
                    useValue: {
                        sendMessage: () => {
                            return [];
                        },
                    }
                }
			],
		}).compile();

		messageService = testingModule.get<MessageService>(MessageService);

    });

    after(async function () {
		testingModule.close();
	});

    describe("GET", () => {
		it("should verify if sendMessage was called one time by message broker", async () => {
			const findQueueSpy = sinon.spy(messageService, "sendMessage");
			const result = await messageService.sendMessage(message);

            expect(findQueueSpy.calledOnce).to.be.true;
            expect(result).to.be.eqls([]);

			findQueueSpy.restore();
		});

        it("should findQueue throws an error with an  with an null queueName", async () => {
			await messageService.sendMessage(null).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should verify if createQueue throws an error with an invalid queue name", async () => {
			await messageService.sendMessage(stubMessage).catch((error) => {
				expect(error).to.be.an("Error");

			});
		});
	});
})