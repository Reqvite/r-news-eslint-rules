# eslint-plugin-v1

Plugin for r-news project

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-v1`:

```sh
npm install eslint-plugin-v1 --save-dev
```

## Usage

Add `v1` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "v1"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "v1/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                       | Description                                                                                 | 🔧 |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ | :- |
| [layer-imports](docs/rules/layer-imports.md)                               | A layer can only import underlying layers (shared, entities, features, widgets, pages, app) |    |
| [module-relative-path-checker](docs/rules/module-relative-path-checker.md) | Within one slice, all paths must be relative                                                | 🔧 |
| [public-api-imports](docs/rules/public-api-imports.md)                     | Absolute import is only allowed from the Public API (index.ts)                              | 🔧 |

<!-- end auto-generated rules list -->


