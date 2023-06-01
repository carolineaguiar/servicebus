import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";

import { MessageController } from "../../../../src/serviceBusManager/adapter/controller/message.controller";
import { MessageService } from "../../../../src/serviceBusManager/domain/service/message.service";
import { SendMessageDTO } from "../../../../src/serviceBusManager/adapter/dto/message.dto";

import chai = require("chai");
import sinon = require("sinon");

const expect = chai.expect;

describe("QueueController", () => {

    let messageController: MessageController;
	let messageService: MessageService;
	let testingModule: TestingModule;

    const message: SendMessageDTO = {
		destination: "anyDestination",
        message: ["AnyMessage"]
	};

    const messageError: any = {
		destination: "anyDestination",
        message: ["AnyMessage"]
	};

	const makeSendMessageBadRequest: any = {};

    beforeEach(async () => {
		testingModule = await Test.createTestingModule({
			controllers: [MessageController],
			providers: [
				{
					provide: MessageService,
					useValue: {
						sendMessage: () => {
							return true;
						}
					},
				},
			],
		}).compile();

		messageController = testingModule.get<MessageController>(MessageController);
		messageService = testingModule.get<MessageService>(MessageService);
    })

    after(async function () {
		testingModule.close();
	});

    describe("POST SEND", () => {

        it("Should be able to receive get request from message broker and verify dto and response", async () => {
			const stub = sinon.stub(messageController, "sendMessage").resolves(messageError);
			const result = await messageController.sendMessage(message);

			expect(stub.calledOnce).to.be.true;
			expect(typeof result).to.eql("object");
			stub.restore()
		});

		it("Should sendMessage consume an null message and throws error", async () => {
			await messageController.sendMessage(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
		});

        it("should sendMessage consume an invalid body and throws error", async () => {
			await messageController.sendMessage(makeSendMessageBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
    })

	describe("POST CONSUME", () => {

        it("Should be able to receive get request from message broker and verify dto and response", async () => {
			const stub = sinon.stub(messageController, "sendMessage").resolves(messageError);
			const result = await messageController.sendMessage(message);

			expect(stub.calledOnce).to.be.true;
			expect(typeof result).to.eql("object");
			stub.restore()
		});

		it("Should sendMessage consume an null message and throws error", async () => {
			await messageController.sendMessage(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
		});

        it("should sendMessage consume an invalid body and throws error", async () => {
			await messageController.sendMessage(makeSendMessageBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
    })
})