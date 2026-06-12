# RBPH Vue SFC Template

This template builds a Vue SFC app into static assets that can be uploaded to RBPH and mounted by the `Vue App` content block.

## Output Contract

After `pnpm bundle`, upload the generated zip in `dist` as one asset group. Use the generated `rbph-vue-app.json` file as the block URL if you configure the block manually.

```json
{
  "type": "rbph-vue-app",
  "version": 1,
  "entry": "./assets/index.js",
  "styles": ["./assets/style.css"]
}
```

The compiled entry exports `mount(el, context)`, and returns an unmount function.

## Development

```bash
pnpm install
pnpm dev
pnpm build
pnpm bundle
```

`pnpm bundle` creates `dist/[project]-[version].zip`. Upload this zip in the puzzle asset manager as a asset group. Then drag the uploaded asset group into the puzzle content editor's `Vue SFC` block, or directly into the editor body.

## RBPH Context

The app receives RBPH context in two ways:

- as the root prop `rbph`
- through Vue injection key `rbph`

```ts
const rbph = inject<RbphContext>('rbph')
```

Useful fields:

```ts
rbph.api.get('/puzzles/1')
rbph.backend.call('state')
rbph.state.getPuzzle()
rbph.state.getTeam()
rbph.assets.resolve('./data.json')
rbph.actions.toast({ title: 'Saved' })
```

This code runs as trusted puzzle content in the page context. Do not upload untrusted code.
