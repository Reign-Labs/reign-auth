import type { ReignAuthOptions } from "@reign-auth/core";
import type { DBAdapter } from "@reign-auth/core/db/adapter";

export interface SchemaGeneratorResult {
	code?: string;
	fileName: string;
	overwrite?: boolean;
	append?: boolean;
}

export interface SchemaGenerator {
	<Options extends ReignAuthOptions>(opts: {
		file?: string;
		adapter: DBAdapter;
		options: Options;
	}): Promise<SchemaGeneratorResult>;
}
