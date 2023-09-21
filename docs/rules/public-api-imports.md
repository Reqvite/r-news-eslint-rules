# Absolute import is only allowed from the Public API (index.ts) (`v1/public-api-imports`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule Details

Absolute import is only allowed from the Public API index.ts

Examples of **incorrect** code for this rule:

```js
    {
      code: "import { Button } from '@/shared/ui/Button/Button'",
      errors: [{ message: "Absolute import is only allowed from the Public API (index.ts)"}],
      options: aliasOptions,
      output: `import { Button } from '@/shared/ui/Button/Button'`
    }
```

Examples of **correct** code for this rule:

```js
    {
      code: "import { Button } from '@/shared/ui/Button'",
      errors: [],
      options: aliasOptions,
    }
```

### Options

{
type: 'object',
properties: {
alias: {
type: 'string'
},
testFilesPatterns: {
type: 'array'
}
}
}
