import { DatabaseSync } from "node:sqlite";
import { kyselyAdapter } from "@reign-auth/kysely-adapter";
import { NodeSqliteDialect } from "@reign-auth/kysely-adapter/node-sqlite-dialect";
import { testAdapter } from "@reign-auth/test-utils/adapter";
import { getMigrations } from "reign-auth/db/migration";
import { Kysely } from "kysely";
import {
	authFlowTestSuite,
	joinsTestSuite,
	normalTestSuite,
	numberIdTestSuite,
	transactionsTestSuite,
	uuidTestSuite,
} from "../adapter-factory";

let db = new DatabaseSync(":memory:");
let reignAuthKysely = new Kysely({
	dialect: new NodeSqliteDialect({
		database: db,
	}),
});

const { execute } = await testAdapter({
	adapter: () => {
		return kyselyAdapter(reignAuthKysely, {
			type: "sqlite",
			debugLogs: { isRunningAdapterTests: true },
		});
	},
	prefixTests: "node-sqlite",
	async runMigrations(reignAuthOptions) {
		await reignAuthKysely.destroy();
		db = new DatabaseSync(":memory:");
		reignAuthKysely = new Kysely({
			dialect: new NodeSqliteDialect({
				database: db,
			}),
		});
		const opts = Object.assign(reignAuthOptions, { database: db });
		const { runMigrations } = await getMigrations(opts);
		await runMigrations();
	},
	tests: [
		normalTestSuite(),
		transactionsTestSuite(),
		authFlowTestSuite(),
		numberIdTestSuite(),
		joinsTestSuite(),
		uuidTestSuite(),
	],
	async onFinish() {
		await reignAuthKysely.destroy();
	},
});

execute();
