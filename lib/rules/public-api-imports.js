/**
 * @fileoverview public-api-imports for r-news-project
 * @author V.Y.
 */
"use strict";
const micromatch = require("micromatch");
const path = require("path");
const { isPathRelative, getLayerAndSegments } = require('../helpers');


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const PUBLIC_ERROR = 'PUBLIC_ERROR';
const TESTING_PUBLIC_ERROR = 'TESTING_PUBLIC_ERROR';


/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: "Absolute import is only allowed from the Public API (index.ts)",
      recommended: false,
      url: null, 
    },
    fixable: 'code', 
    messages: {
      [PUBLIC_ERROR]: 'Absolute import is only allowed from the Public API (index.ts)',
      [TESTING_PUBLIC_ERROR]: 'Test data needs to be imported from publicApi/testing.ts',
    },
    schema: [
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
    ],
  },

  create(context) {
    const options = context.options[0] ? context.options[0] : {}
    const { alias = '', testFilesPatterns = [] } = options;

    const checkingLayers = {
      'entities': 'entities',
      'features': 'features',
      'pages': 'pages',
      'widgets': 'widgets',
    }

    return {
      ImportDeclaration(node) {
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value;

        if(isPathRelative(importTo)) {
          return;
        }

        // [entities, article, model, types]
        const {segments, layer, slice} = getLayerAndSegments(importTo)

        
        if(layer === 'shared' && slice === 'ui' && segments.length > 3){
          context.report({
            node,
            messageId: PUBLIC_ERROR,
          });
        }

        if(!checkingLayers[layer]) {
          return;
        }

        const isImportNotFromPublicApi = segments.length > 2;
        // [entities, article, testing]
        const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4

        if (isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report({
            node,
            messageId: PUBLIC_ERROR,
            fix: (fixer) => {
              return fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`)
            },
          });
        }

        if(isTestingPublicApi) {
          const currentFilePath = context.filename;

          const normalizedPath = path.toNamespacedPath(currentFilePath);

          const isCurrentFileTesting = testFilesPatterns.some(
              pattern => micromatch.isMatch(normalizedPath, pattern)
          )

          if(!isCurrentFileTesting) {
            context.report({
              node,
              messageId: TESTING_PUBLIC_ERROR,
            });
          }
        }
      }
    };
  },
};

