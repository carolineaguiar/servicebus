import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";

import { TopicService } from "../../../../src/serviceBusManager/domain/service/topic.service";
import { createTopicEntity, deleteTopicEntity, findTopicEntity } from "../../../../src/serviceBusManager/domain/entities/topic";
import chai = require("chai");
import sinon = require("sinon");
const expect = chai.expect;

describe("Queue Service", () => {

    let topicService: TopicService;
    let testingModule: TestingModule;

    const topicName: findTopicEntity = {
		findTopic: "test"
	};

	const stubTopic: any = {
		findTopic: ""
	};

	const newTopic: createTopicEntity = {
		newTopic: "test"
	};

	const stubNewTopic: any = {
		findTopic: ""
	};

	const deleteTopic: deleteTopicEntity = {
		deleteTopic: "test"
	};

	const stubDeleteTopic: any = {
		deleteTopic: ""
	};

    beforeEach(async () => {
		testingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
					TopicService,

                {
                    provide: "MessageBroker",
                    useValue: {
                        findTopic: () => {
                            return [];
                        },
						createTopic: () => {
                            return [];
                        },
						deleteTopic: () => {
                            return [];
                        }
                    }
                }
			],
		}).compile();

		topicService = testingModule.get<TopicService>(TopicService);

    });

    after(async function () {
		testingModule.close();
	});

    describe("GET", () => {
		it("should verify if findTopic was called one time by message broker", async () => {
			const findTopicSpy = sinon.spy(topicService, "findTopic");
			const result = await topicService.findTopic(topicName);

            expect(findTopicSpy.calledOnce).to.be.true;
            expect(result).to.be.eqls([]);

			findTopicSpy.restore();
		});

        it("should findTopic throws an error with an null topicName", async () => {
			await topicService.findTopic(null).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should findTopic throws an error with an invalid topicName", async () => {
			await topicService.findTopic(stubTopic).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});

	describe("POST", () => {
		it("should verify if createTopic was called one time by message broker", async () => {
			const createTopicSpy = sinon.spy(topicService, "createTopic");
			const result = await topicService.createTopic(newTopic);

            expect(createTopicSpy.calledOnce).to.be.true;
            expect(result).to.be.eqls([]);

			createTopicSpy.restore();
		});

        it("should createTopic throws an error with an null topicName", async () => {
			await topicService.createTopic(null).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should createTopic throws an error with an invalid queue name", async () => {
			await topicService.createTopic(stubNewTopic).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});

	describe("DELETE", () => {
		it("should verify if deleteTopic was called one time by message broker", async () => {
			const deleteTopicSpy = sinon.spy(topicService, "deleteTopic");
			const result = await topicService.deleteTopic(deleteTopic);

            expect(deleteTopicSpy.calledOnce).to.be.true;
            expect(result).to.be.eqls([]);

			deleteTopicSpy.restore();
		});

        it("should deleteTopic throws an error with an null topicName", async () => {
			await topicService.deleteTopic(null).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should deleteTopic throws an error with an invalid queue name", async () => {
			await topicService.deleteTopic(stubDeleteTopic).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});

})