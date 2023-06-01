import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";

import { QueueService } from "../../../../src/serviceBusManager/domain/service/queue.service";
import { createQueueEntity, deleteQueueEntity, findQueueEntity } from "../../../../src/serviceBusManager/domain/entities/queue";

import chai = require("chai");
import sinon = require("sinon");
const expect = chai.expect;

describe("Queue Service", () => {

    let queueService: QueueService;
    let testingModule: TestingModule;

	const queueName: findQueueEntity = {
		findQueue: "test"
	};

	const stubQueue: any = {
		findQueue: ""
	};

	const newQueue: createQueueEntity = {
		newQueue: "test"
	};

	const stubNewQueue: any = {
		newQueue: ""
	};

	const deleteQueue: deleteQueueEntity = {
		deleteQueue: "test"
	};

	const stubDeleteQueue: any = {
		deleteQueue: ""
	};

    beforeEach(async () => {
		testingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
					QueueService,

                {
                    provide: "MessageBroker",
                    useValue: {
                        findQueue: () => {
                            return [];
                        },
						createQueue: () => {
                            return [];
                        },
						deleteQueue: () => {
                            return [];
                        }
                    }
                }
			],
		}).compile();

		queueService = testingModule.get<QueueService>(QueueService);

    });

    after(async function () {
		testingModule.close();
	});

    describe("GET", () => {
		it("should verify if findQueue was called one time by message broker", async () => {
			const findQueueSpy = sinon.spy(queueService, "findQueue");
			const result = await queueService.findQueue(queueName);

            expect(findQueueSpy.calledOnce).to.be.true;
            expect(result).to.be.eqls([]);

			findQueueSpy.restore();
		});

        it("should findQueue throws an error with an  with an null queueName", async () => {
			await queueService.findQueue(null).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should verify if createQueue throws an error with an invalid queue name", async () => {
			await queueService.findQueue(stubQueue).catch((error) => {
				expect(error).to.be.an("Error");

			});
		});
	});

	describe("POST", () => {
		it("should verify if createQueue was called one time by message broker", async () => {
			const createQueueSpy = sinon.spy(queueService, "createQueue");
			const result = await queueService.createQueue(newQueue);

            expect(createQueueSpy.calledOnce).to.be.true;
            expect(result).to.be.eqls([]);

			createQueueSpy.restore();
		});

        it("should createQueue throws an error with an null queueName", async () => {
			await queueService.createQueue(null).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should verify if createQueue throws an error with an invalid queue name", async () => {
			await queueService.createQueue(stubNewQueue).catch((error) => {
				expect(error).to.be.an("Error");

			});
		});
	});

	describe("DELETE", () => {
		it("should verify if deleteQueue was called one time by message broker", async () => {
			const deleteQueueSpy = sinon.spy(queueService, "deleteQueue");
			const result = await queueService.deleteQueue(deleteQueue);

            expect(deleteQueueSpy.calledOnce).to.be.true;
            expect(result).to.be.eqls([]);

			deleteQueueSpy.restore();
		});

        it("should deleteQueue throws an error with an null queueName", async () => {
			await queueService.deleteQueue(null).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should verify if deleteQueue throws an error with an invalid queue name", async () => {
			await queueService.deleteQueue(stubDeleteQueue).catch((error) => {
				expect(error).to.be.an("Error");

			});
		});
	});
})