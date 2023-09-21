# Within one slice, all paths must be relative (`v1/module-relative-path-checker`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule Details

Within one slice, all paths must be relative

Examples of **incorrect** code for this rule:

```js
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slices/addCommentFormSlice'",
      errors: [{ message: "Within one slice, all paths must be relative"}],
      output: "import { addCommentFormActions, addCommentFormReducer } from './Article/model/slices/addCommentFormSlice'"
    },
```

Examples of **correct** code for this rule:

```js
 {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice'",
      errors: [],
    },
```

### Options

```js
 {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
```
