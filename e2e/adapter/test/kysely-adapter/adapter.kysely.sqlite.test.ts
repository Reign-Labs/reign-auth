import fs from "node:fs/promises";
import path from "node:path";
import { kyselyAdapter } from "@reign-auth/kysely-adapter";
import { testAdapter } from "@reign-auth/test-utils/adapter";
import { getMigrations } from "reign-auth/db/migration";
import Database from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import {
	authFlowTestSuite,
	caseInsensitiveTestSuite,
	joinsTestSuite,
	normalTestSuite,
	numberIdTestSuite,
	transactionsTestSuite,
	uuidTestSuite,
} from "../adapter-factory";

const dbPath = path.join(__dirname, "test.db");
let database = new Database(dbPath);

let kyselyDB = new Kysely({
	dialect: new SqliteDialect({ database }),
});

const { execute } = await testAdapter({
	adapter: () => {
		return kyselyAdapter(kyselyDB, {
			type: "sqlite",
			debugLogs: { isRunningAdapterTests: true },
		});
	},
	prefixTests: "sqlite",
	async runMigrations(reignAuthOptions) {
		database.close();
		try {
			await fs.unlink(dbPath);
		} catch {
			console.log("db doesn't exist");
		}
		database = new Database(dbPath);
		kyselyDB = new Kysely({ dialect: new SqliteDialect({ database }) });
		const opts = Object.assign(reignAuthOptions, { database });
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
		caseInsensitiveTestSuite(),
	],
	async onFinish() {
		database.close();
	},
});
execute();
