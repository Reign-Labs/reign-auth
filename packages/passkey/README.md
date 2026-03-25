# Reign Auth Passkey Plugin

## Installation

```bash
# Using npm
npm install reign-auth @reign-auth/passkey

# Using yarn
yarn add reign-auth @reign-auth/passkey

# Using pnpm
pnpm add reign-auth @reign-auth/passkey

# Using bun
bun add reign-auth @reign-auth/passkey
```

## Usage

### Server

```typescript
import { reignAuth } from 'reign-auth';
import { passkey } from '@reign-auth/passkey';

export const auth = reignAuth({
  plugins: [
    passkey({
      rpID: 'example.com',
      rpName: 'My App',
    }),
  ],
});
```

### Client

```typescript
import { createAuthClient } from 'reign-auth/client';
import { passkeyClient } from '@reign-auth/passkey/client';

export const authClient = createAuthClient({
  plugins: [passkeyClient()],
});
```

## Documentation

For more information, visit the [Reign Auth Passkey documentation](https://auth.reign-labs.com/docs/plugins/passkey).

## License

MIT
