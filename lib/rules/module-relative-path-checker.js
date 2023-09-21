/**
 * @fileoverview Checking relative imports within a module
 * @author V.Y.
 */
"use strict";
const path = require("path");

const { isPathRelative, getLayerAndSegments, getNormalizedCurrentFilePath } = require('../helpers');
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const ERROR = 'PUBLIC_ERROR';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: "Within one slice, all paths must be relative",
      recommended: false,
      url: null, 
    },
    fixable: 'code', 
    messages: {
      [ERROR]: 'Within one slice, all paths must be relative',
    },
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ],
  },

  create(context) {
    const options = context.options[0] ? context.options[0] : {}
    const { alias = ''} = options;

    return {
      ImportDeclaration(node) {
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value;

        // example C:\Users\tim\Desktop\javascript\production_project\src\entities\Article
       const fromFileName = context.filename

       if(!fromFileName.includes('\\src\\')){
        return
       }

       if(shouldBeRelative(fromFileName, importTo)) {
        context.report({
          node,
          messageId: ERROR,
          fix: (fixer) => {
            const normalizedPath = getNormalizedCurrentFilePath(fromFileName) // /entities/Article/Article.tsx
                  .split('/')
                  .slice(0, -1)
                  .join('/');
              let relativePath = path.relative(normalizedPath, `/${importTo}`).split('\\')
                  .join('/');

              if(!relativePath.startsWith('.')) {
                relativePath = './' + relativePath;
              }

              return fixer.replaceText(node.source, `'${relativePath}'`)
          }
        });
      }
    }
  }
}}

const layers = {
  'entities': 'entities',
  'features': 'features',
  'shared': 'shared',
  'pages': 'pages',
  'widgets': 'widgets',
}

// isPathRelative(to): This function checks whether the to path is relative (e.g., starting with ./ or ../). If to is a relative path, the function returns false, indicating that from should not be relative.
function shouldBeRelative(from, to) {
  if(isPathRelative(to)) {
    return false;
  }

  // example entities/Article
  const {layer, slice} = getLayerAndSegments(to)

  if(!layer || !slice || !layers[layer]) {
    return false;
  }

  const projectFrom = getNormalizedCurrentFilePath(from);
  const fromArray = projectFrom.split('/')

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if(!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  // Сompares fromSlice to slice and fromLayer to layer. If they match, the function returns true, indicating that from should be relative to to. Otherwise, it returns false.
  return fromSlice === slice && layer === fromLayer;
}

