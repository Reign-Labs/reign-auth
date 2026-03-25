/**
 * Provider helpers for generic-oauth plugin
 *
 * These helpers provide pre-configured OAuth provider definitions.
 *
 * @example
 * ```ts
 * import { reignAuth } from 'reign-auth';
 * import {
 *  genericOAuth,
 *  auth0,
 *  gumroad,
 *  hubspot,
 *  keycloak,
 *  line,
 *  microsoftEntraId,
 *  okta,
 *  slack,
 *  patreon,
 * } from 'reign-auth/plugins';
 *
 * export const auth = reignAuth({
 *   plugins: [
 *     genericOAuth({
 *       config: [
 *         okta({ clientId, clientSecret, issuer }),
 *         auth0({ clientId, clientSecret, domain }),
 *         microsoftEntraId({ clientId, clientSecret, tenantId }),
 *         slack({ clientId, clientSecret }),
 *         keycloak({ clientId, clientSecret, issuer }),
 *         gumroad({ clientId, clientSecret }),
 *       ],
 *     }),
 *   ],
 * });
 * ```
 */

export { type Auth0Options, auth0 } from "./auth0";
export { type GumroadOptions, gumroad } from "./gumroad";
export { type HubSpotOptions, hubspot } from "./hubspot";
export { type KeycloakOptions, keycloak } from "./keycloak";
export { type LineOptions, line } from "./line";
export {
	type MicrosoftEntraIdOptions,
	microsoftEntraId,
} from "./microsoft-entra-id";
export { type OktaOptions, okta } from "./okta";
export { type PatreonOptions, patreon } from "./patreon";
export { type SlackOptions, slack } from "./slack";
