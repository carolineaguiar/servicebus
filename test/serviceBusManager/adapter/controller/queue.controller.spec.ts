import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";

import { QueueController } from "../../../../src/serviceBusManager/adapter/controller/queue.controller";
import { QueueService } from "../../../../src/serviceBusManager/domain/service/queue.service";
import { CreateQueueDTO, DeleteQueueDTO, FindQueueDTO } from "../../../../src/serviceBusManager/adapter/dto/queue.dto";

import chai = require("chai");
import sinon = require("sinon");

const expect = chai.expect;

describe("QueueController", () => {

	let queueController: QueueController;
	let queueService: QueueService;
	let testingModule: TestingModule;

    const queueName: FindQueueDTO = {
		findQueue: "anyQueue"
	};

	const queueNameError: any = {
		findQueue: ""
	};

	const makeFindQueueBadRequest: any = {};

	const newQueue: CreateQueueDTO = {
		newQueue: "anyQueue"
	};

	const newQueueError: any = {
		findQueue: ""
	};

	const makeCreateQueueBadRequest: any = {};

	const deleteQueue: DeleteQueueDTO = {
		deleteQueue: "anyQueue"
	};

	const deleteQueueError: any = {
		findQueue: ""
	};

	const makeDeleteQueueBadRequest: any = {};

    beforeEach(async () => {
		testingModule = await Test.createTestingModule({
			controllers: [QueueController],
			providers: [
				{
					provide: QueueService,
					useValue: {
						findQueue: () => {
							return true;
						},
						createQueue: () => {
							return true;
						},
						deleteQueue: () => {
							return true;
						},
					},
				},
			],
		}).compile();

		queueController = testingModule.get<QueueController>(QueueController);
		queueService = testingModule.get<QueueService>(QueueService);
	});

    after(async function () {
		testingModule.close();
	});

    describe("GET", () => {

		it("Should be able to receive get request from message broker and verify dto and response", async () => {
			const stub = sinon.stub(queueController, "findQueue").resolves(queueNameError);
			const result = await queueController.findQueue(queueName);

			expect(stub.calledOnce).to.be.true;
			expect(typeof result).to.eql("object");
			stub.restore()
		});

		it("Should findQueue consume an null message and throws error", async () => {
			const stub = sinon.stub(queueService, "findQueue").throws();
			await queueController.findQueue(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
			expect(stub.calledOnce).to.be.true;
			stub.restore()
		});

        it("should findQueue consume an invalid body and throws error", async () => {
			await queueController.findQueue(makeFindQueueBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});

	describe("POST", () => {

		it("Should be able to receive post request from message broker and verify dto and response", async () => {
			const stub = sinon.stub(queueController, "createQueue").resolves(newQueueError);
			const result = await queueController.createQueue(newQueue);

			expect(stub.calledOnce).to.be.true;
			expect(typeof result).to.eql("object");
			stub.restore()

		});

		it("Should createQueue consume an null message and throws error", async () => {
			await queueController.createQueue(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
		});

        it("should createQueue consume an invalid body and throws error", async () => {
			await queueController.createQueue(makeCreateQueueBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});

	describe("DELETE", () => {

		it("Should be able to receive delete request from message broker and verify dto and response", async () => {
			const stub = sinon.stub(queueController, "deleteQueue").resolves(deleteQueueError);
			const result = await queueController.deleteQueue(deleteQueue);

			expect(stub.calledOnce).to.be.true;
			expect(typeof result).to.eql("object");
			stub.restore()
		});

		it("Should deleteQueue consume an null body request and throws error", async () => {
			await queueController.deleteQueue(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
		});

        it("should deleteQueue consume an invalid body and throws error", async () => {
			await queueController.deleteQueue(makeDeleteQueueBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});
})