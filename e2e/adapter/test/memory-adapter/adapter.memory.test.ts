import { memoryAdapter } from "@reign-auth/memory-adapter";
import { testAdapter } from "@reign-auth/test-utils/adapter";
import { getAuthTables } from "reign-auth/db";
import {
	authFlowTestSuite,
	caseInsensitiveTestSuite,
	joinsTestSuite,
	normalTestSuite,
	numberIdTestSuite,
	transactionsTestSuite,
	uuidTestSuite,
} from "../adapter-factory";

let db: Record<string, any[]> = {};

const { execute } = await testAdapter({
	adapter: () => {
		return memoryAdapter(db);
	},
	runMigrations: (options) => {
		db = {};
		const authTables = getAuthTables(options);
		const allModels = Object.keys(authTables);
		for (const model of allModels) {
			const modelName = authTables[model]?.modelName || model;
			db[modelName] = [];
		}
	},
	tests: [
		normalTestSuite(),
		transactionsTestSuite({ disableTests: { ALL: true } }),
		authFlowTestSuite(),
		numberIdTestSuite(),
		joinsTestSuite(),
		uuidTestSuite(),
		caseInsensitiveTestSuite(),
	],
	async onFinish() {},
});

execute();
