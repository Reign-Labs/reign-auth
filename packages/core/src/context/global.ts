import type { AsyncLocalStorage } from "@reign-auth/core/async_hooks";

interface ReignAuthGlobal {
	/**
	 * The version of ReignAuth.
	 */
	version: string;
	/**
	 * Used to track the number of ReignAuth instances in the same process.
	 *
	 * Debugging purposes only.
	 */
	epoch: number;
	/**
	 * Stores the AsyncLocalStorage instances for each context.
	 */
	context: Record<string, AsyncLocalStorage<unknown>>;
}

const symbol = Symbol.for("reign-auth:global");
let bind: ReignAuthGlobal | null = null;

const __context: Record<string, AsyncLocalStorage<unknown>> = {};
const __reignAuthVersion: string = import.meta.env
	.REIGN_AUTH_VERSION as string;

/**
 * We store context instance in the globalThis.
 *
 * The reason we do this is that some bundlers, web framework, or package managers might
 * create multiple copies of ReignAuth in the same process intentionally or unintentionally.
 *
 * For example, yarn v1, Next.js, SSR, Vite...
 *
 * @internal
 */
export function __getReignAuthGlobal(): ReignAuthGlobal {
	if (!(globalThis as any)[symbol]) {
		(globalThis as any)[symbol] = {
			version: __reignAuthVersion,
			epoch: 1,
			context: __context,
		};
		bind = (globalThis as any)[symbol] as ReignAuthGlobal;
	}
	bind = (globalThis as any)[symbol] as ReignAuthGlobal;
	if (bind.version !== __reignAuthVersion) {
		bind.version = __reignAuthVersion;
		// Different versions of ReignAuth are loaded in the same process.
		bind.epoch++;
	}
	return (globalThis as any)[symbol] as ReignAuthGlobal;
}

export function getReignAuthVersion(): string {
	return __getReignAuthGlobal().version;
}
