# A layer can only import underlying layers (shared, entities, features, widgets, pages, app) (`v1/layer-imports`)

<!-- end auto-generated rule header -->

## Rule Details

A layer can only import underlying layers (shared, entities, features, widgets, pages, app)

Examples of **incorrect** code for this rule:

```js
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Articl'",
      errors: [{ message: "A layer can only import underlying layers 'shared,entities'"}],
      options: aliasOptions,
    }
```

Examples of **correct** code for this rule:

```js
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\features\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
      errors: [],
      options: aliasOptions,
    }
```

### Options

```js
 {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          ignoreImportPatterns: {
            type: 'array',
          }
        }
      }
```
