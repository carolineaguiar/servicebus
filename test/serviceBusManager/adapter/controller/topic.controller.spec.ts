import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";

import { TopicController } from "../../../../src/serviceBusManager/adapter/controller/topic.controller";
import { TopicService } from "../../../../src/serviceBusManager/domain/service/topic.service";
import { CreateTopicDTO, DeleteTopicDTO, FindTopicDTO } from "../../../../src/serviceBusManager/adapter/dto/topic.dto";

import chai = require("chai");
import sinon = require("sinon");

const expect = chai.expect;

describe("TopicController", () => {

	let topicController: TopicController;
	let topicService: TopicService;
	let testingModule: TestingModule;

    const topicName: FindTopicDTO = {
		findTopic: "anyTopic"
	};

	const topicNameError: any = {
		findTopic: ""
	};

	const makeFindTopicBadRequest: any = {};

	const newTopic: CreateTopicDTO = {
		newTopic: "anyTopic"
	};

	const createTopicNameError: any = {
		newTopic: ""
	};

	const makeCreateTopicBadRequest: any = {};

	const deleteTopic: DeleteTopicDTO = {
		deleteTopic: "anyTopic"
	};

	const deleteTopicNameError: any = {
		deleteTopic: ""
	};

	const makeDeleteTopicBadRequest: any = {};


    beforeEach(async () => {
		testingModule = await Test.createTestingModule({
			controllers: [TopicController],
			providers: [
				{
					provide: TopicService,
					useValue: {
						findTopic: () => {
							return true;
						},
						createTopic: () => {
							return true;
						},
						deleteTopic: () => {
							return true;
						},
					},
				},
			],
		}).compile();

		topicController = testingModule.get<TopicController>(TopicController);
		topicService = testingModule.get<TopicService>(TopicService);
	});

    after(async function () {
		testingModule.close();
	});

    describe("GET", () => {

		it("Should be able to receive get request from message broker and verify dto and response", async () => {

			const createTopicSpy = sinon.spy(topicService, "createTopic");
			const result = await topicController.createTopic(newTopic);

            expect(createTopicSpy.calledOnce).to.be.true;
            expect(result).to.be.true;
			createTopicSpy.restore();
		});
		
		it("Should findTopic consume an invalid topic name and throws error", async () => {
			await topicController.findTopic(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
		});

        it("should findTopic fail body request", async () => {
			await topicController.findTopic(makeFindTopicBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});

	describe("POST", () => {

		it("Should be able to receive an post request from message broker and verify dto and response", async () => {
			//const stub = sinon.stub(topicController, "createTopic").resolves(createTopicNameError);
			const result = await topicController.createTopic(newTopic);

			//expect(stub.calledOnce).to.be.true;
			expect(typeof result).to.eql("boolean");
		});

		it("Should createTopic consume an invalid name and throws error", async () => {
			await topicController.createTopic(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
		});

        it("should createTopic fail body request", async () => {
			await topicController.createTopic(makeCreateTopicBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

	});

	describe("DELETE", () => {

		it("Should be able to receive an delete request from message broker and verify dto and response", async () => {
			//const stub = sinon.stub(topicController, "deleteTopic").resolves(deleteTopicNameError);
			const result = await topicController.deleteTopic(deleteTopic);

		//	expect(stub.calledOnce).to.be.true;
			expect(typeof result).to.eql("boolean");
		});

		it("Should deleteTopic consume an invalid name and throws error", async () => {
			await topicController.deleteTopic(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
		});

        it("should deleteTopic fail body request", async () => {
			await topicController.deleteTopic(makeDeleteTopicBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

	});
})