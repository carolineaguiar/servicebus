import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";

import { SubscriptionService } from "../../../../src/serviceBusManager/domain/service/subscription.service";
import { createSubscriptionEntity, deleteSubscriptionEntity, findSubscriptionEntity } from "../../../../src/serviceBusManager/domain/entities/subscription";

import chai = require("chai");
import sinon = require("sinon");
const expect = chai.expect;

describe("Queue Service", () => {

    let subscriptionService: SubscriptionService;
    let testingModule: TestingModule;

	const subscriptionName: findSubscriptionEntity = {
        topicName: "anyTopic",
        subscriptionName: "anySubscription"
	};

    const subscriptionTopicError: findSubscriptionEntity = {
        topicName: null,
        subscriptionName: "anySubscription"
	};

    const subscriptionNameError: findSubscriptionEntity = {
        topicName: "anyTopic",
        subscriptionName: null
	};

	const stubSubscription: any = {
        topicName: "anyTopic",
        subscriptionName: "anySubscription"
	};

	const newSubscription: createSubscriptionEntity = {
        topicName: "anyTopic",
        newSubscription: "anySubscription"
	};

	const stubNewSubscription: any = {
        topicName: "anyTopic",
        newSubscription: "anySubscription"
	};

    const newSubscriptionTopicError: createSubscriptionEntity = {
        topicName: null,
        newSubscription: "anySubscription"
	};

    const newSubscriptionNameError: createSubscriptionEntity = {
        topicName: "anyTopic",
        newSubscription: null
	};

	const deleteSubscription: deleteSubscriptionEntity = {
        topicName: "anyTopic",
        deleteSubscription: "anySubscription"
	};

	const stubDeleteSubscription: any = {
        topicName: "anyTopic",
        deleteSubscription: "anySubscription"
	};

    const deleteSubscriptionTopicError: deleteSubscriptionEntity = {
        topicName: null,
        deleteSubscription: "anySubscription"
	};

    const deleteSubscriptionNameError: deleteSubscriptionEntity = {
        topicName: "anyTopic",
        deleteSubscription: null
	};


    beforeEach(async () => {
		testingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
					SubscriptionService,

                {
                    provide: "MessageBroker",
                    useValue: {
                        findSubscription: () => {
                            return [];
                        },
						createSubscription: () => {
                            return [];
                        },
						deleteSubscription: () => {
                            return [];
                        }
                    }
                }
			],
		}).compile();

		subscriptionService = testingModule.get<SubscriptionService>(SubscriptionService);

    });

    after(async function () {
		testingModule.close();
	});

    describe("GET", () => {
		it("should verify if findSubscription was called one time by message broker", async () => {
			const findSubscriptionSpy = sinon.spy(subscriptionService, "findSubscription");
			const result = await subscriptionService.findSubscription(subscriptionName);

            expect(findSubscriptionSpy.calledOnce).to.be.true;
            expect(result).to.be.eqls([]);

			findSubscriptionSpy.restore();
		});

        it("should findSubscription throws an error with an null body request", async () => {
			await subscriptionService.findSubscription(null).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should findSubscription throws an error with an null subscriptionName", async () => {
			await subscriptionService.findSubscription(subscriptionNameError).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should findSubscription throws an error with an null topicName", async () => {
			await subscriptionService.findSubscription(subscriptionTopicError).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should verify if createQueue throws an error with an invalid queue name", async () => {
			await subscriptionService.findSubscription(stubSubscription).catch((error) => {
				expect(error).to.be.an("Error");

			});
		});
	});

	describe("POST", () => {
		it("should verify if createSubscription was called one time by message broker", async () => {
			const createSubscriptionSpy = sinon.spy(subscriptionService, "createSubscription");
			const result = await subscriptionService.createSubscription(newSubscription);

            expect(createSubscriptionSpy.calledOnce).to.be.true;
            expect(result).to.be.eqls([]);

			createSubscriptionSpy.restore();
		});

        it("should createSubscription throws an error with an null body request", async () => {
			await subscriptionService.createSubscription(null).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should createSubscription throws an error with an null subscriptionName", async () => {
			await subscriptionService.createSubscription(newSubscriptionNameError).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should createSubscription throws an error with an null topicName", async () => {
			await subscriptionService.createSubscription(newSubscriptionTopicError).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should verify if createSubscription throws an error with an invalid subscription", async () => {
			await subscriptionService.createSubscription(stubNewSubscription).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});

	describe("DELETE", () => {
		it("should verify if deleteSubscription was called one time by message broker", async () => {
			const deleteSubscriptionSpy = sinon.spy(subscriptionService, "deleteSubscription");
			const result = await subscriptionService.deleteSubscription(deleteSubscription);

            expect(deleteSubscriptionSpy.calledOnce).to.be.true;
            expect(result).to.be.eqls([]);

			deleteSubscriptionSpy.restore();
		});

        it("should deleteSubscription throws an error with an null body request", async () => {
			await subscriptionService.deleteSubscription(null).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should deleteSubscription throws an error with an null subscriptionName", async () => {
			await subscriptionService.deleteSubscription(deleteSubscriptionNameError).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should deleteSubscription throws an error with an null topicName", async () => {
			await subscriptionService.deleteSubscription(deleteSubscriptionTopicError).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});

        it("should verify if deleteSubscription throws an error with an invalid subscription", async () => {
			await subscriptionService.deleteSubscription(stubDeleteSubscription).catch((error) => {
				expect(error).to.be.an("Error");
			});
		});
	});
})