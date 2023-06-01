import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";

import { SubscriptionController } from "../../../../src/serviceBusManager/adapter/controller/subscription.controller";
import { SubscriptionService } from "../../../../src/serviceBusManager/domain/service/subscription.service";
import { CreateSubscriptionDTO, DeleteSubscriptionDTO, FindSubscriptionDTO } from "../../../../src/serviceBusManager/adapter/dto/subscription.dto";

import chai = require("chai");
import sinon = require("sinon");

const expect = chai.expect;

describe("SubscriptionController", () => {

	let subscriptionController: SubscriptionController;
	let subscriptionService: SubscriptionService;
	let testingModule: TestingModule;

    const subscriptionName: FindSubscriptionDTO = {
        topicName: "anyTopic",
        subscriptionName: "anySubscription"
	};

	const subscriptionNameError: any = {
        topicName: "anyTopic",
        subscriptionName: "anySubscription"
	};

	const makeFindSubscriptionBadRequest: any = {};

	const newSubscription: CreateSubscriptionDTO = {
        topicName: "anyTopic",
        newSubscription: "anySubscription"
	};

	const newSubscriptionError: any = {
        topicName: "anyTopic",
        newSubscription: "anySubscription"
	};

	const makeCreateSubscriptionBadRequest: any = {};

	const deleteSubscription: DeleteSubscriptionDTO = {
        topicName: "anyTopic",
        deleteSubscription: "anySubscription"
	};

	const deleteSubscriptionError: any = {
        topicName: "anyTopic",
        newSubscription: "anySubscription"
	};

	const makeDeleteSubscriptionBadRequest: any = {};

    beforeEach(async () => {
		testingModule = await Test.createTestingModule({
			controllers: [SubscriptionController],
			providers: [
				{
					provide: SubscriptionService,
					useValue: {
						findSubscription: () => {
							return true;
						},
						createSubscription: () => {
							return true;
						},
						deleteSubscription: () => {
							return true;
						},
					},
				},
			],
		}).compile();

		subscriptionController = testingModule.get<SubscriptionController>(SubscriptionController);
		subscriptionService = testingModule.get<SubscriptionService>(SubscriptionService);
	});

    after(async function () {
		testingModule.close();
	});

    describe("GET", () => {

		it("Should be able to receive get request from message broker and verify dto and response", async () => {
			//const stub = sinon.stub(subscriptionController, "findSubscription").resolves(subscriptionNameError);
			const result = await subscriptionController.findSubscription(subscriptionName);

			//expect(stub.calledOnce).to.be.true;
			expect(typeof result).to.eql("boolean");
			//stub.restore()
		});

		it("Should findSubscription consume an null message and throws error", async () => {
			const stub = sinon.stub(subscriptionService, "findSubscription").throws();
			await subscriptionController.findSubscription(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
			expect(stub.calledOnce).to.be.true;
			stub.restore()
		});

        it("should findSubscription consume an invalid body and throws error", async () => {
			await subscriptionController.findSubscription(makeFindSubscriptionBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});

	describe("POST", () => {

		it("Should be able to receive post request from message broker and verify dto and response", async () => {
			//const stub = sinon.stub(subscriptionController, "createSubscription").resolves(newSubscriptionError);
			const result = await subscriptionController.createSubscription(newSubscription);

			//expect(stub.calledOnce).to.be.true;
			expect(typeof result).to.eql("boolean");
			//stub.restore()
		});

		it("Should createSubscription consume an null message and throws error", async () => {
			await subscriptionController.createSubscription(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
		});

        it("should createSubscription consume an invalid body and throws error", async () => {
			await subscriptionController.createSubscription(makeCreateSubscriptionBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});

	describe("DELETE", () => {

		it("Should be able to receive delete request from message broker and verify dto and response", async () => {
			const result = await subscriptionController.deleteSubscription(deleteSubscription);
			expect(typeof result).to.eql("boolean");
		});

		it("Should deleteSubscription consume an null body request and throws error", async () => {
			await subscriptionController.deleteSubscription(null).catch((_error) => {
				expect(_error).to.be.an.instanceOf(Error);
			});
		});

        it("should deleteQueue consume an invalid body and throws error", async () => {
			await subscriptionController.deleteSubscription(makeDeleteSubscriptionBadRequest).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});
})