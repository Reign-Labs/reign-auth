import type { ReignAuthOptions } from "@reign-auth/core";
import { createTestSuite } from "@reign-auth/test-utils/adapter";
import { getNormalTestSuiteTests } from "../adapter-factory";

export const DEFAULT_SCHEMA_REFERENCE = "internal";

const DEFAULT_REIGN_AUTH_OPTIONS: ReignAuthOptions = {
	user: {
		modelName: `${DEFAULT_SCHEMA_REFERENCE}.users`,
	},
	session: {
		modelName: `${DEFAULT_SCHEMA_REFERENCE}.sessions`,
	},
	account: {
		modelName: `${DEFAULT_SCHEMA_REFERENCE}.accounts`,
	},
};

/**
 * This tests using schema references for the models.
 * For example, users can modify table names to use something like `public.user` instead of just a plain `user`.
 */
export const schemaRefTestSuite = createTestSuite(
	"schema-reference",
	{
		defaultReignAuthOptions: DEFAULT_REIGN_AUTH_OPTIONS,
		alwaysMigrate: true,
		prefixTests: "schema-reference",
	},
	(helpers) => {
		const {
			"findOne - should find a model with modified model name": _,
			...tests
		} = getNormalTestSuiteTests(helpers);
		return tests;
	},
);

/**
 * Same as the normal standard notation test suite, but with joins enabled.
 */
export const schemaRefJoinTestSuite = createTestSuite(
	"schema-reference-join",
	{
		defaultReignAuthOptions: {
			...DEFAULT_REIGN_AUTH_OPTIONS,
			experimental: {
				joins: true,
			},
		},
		alwaysMigrate: true,
		prefixTests: "schema-reference-join",
	},
	(helpers) => {
		const {
			"findOne - should find a model with modified model name": _,
			...tests
		} = getNormalTestSuiteTests(helpers);
		return tests;
	},
);
