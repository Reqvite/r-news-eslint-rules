/**
 * @fileoverview A layer can only import underlying layers (shared, entities, features, widgets, pages, app)
 * @author V.Y
 */
"use strict";

const micromatch = require('micromatch');
const { getNormalizedCurrentFilePath, getLayerAndSegments, isPathRelative } = require('../helpers');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const ERROR = 'PUBLIC_ERROR';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: "A layer can only import underlying layers (shared, entities, features, widgets, pages, app)",
      recommended: false,
      url: null, 
    },
    fixable: null, 
    messages: {
      [ERROR]: "A '{{ name }}' can only import underlying layers '{{ layers }}'",
    },
    schema: [
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
    ],
  },


  create(context) {
    const options = context.options[0] ? context.options[0] : {}
    const {alias = '', ignoreImportPatterns = []} = options;

    const layers = {
      'app': ['pages', 'widgets', 'features', 'shared', 'entities'],
      'pages': ['widgets', 'features', 'shared', 'entities'],
      'widgets': ['features', 'shared', 'entities'],
      'features': ['shared', 'entities'],
      'entities': ['shared', 'entities'],
      'shared': ['shared'],
    }

    const availableLayers = {
      'app': 'app',
      'entities': 'entities',
      'features': 'features',
      'shared': 'shared',
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
       
        const importLayer = importTo.split('/')[0]
    
        const filename = context.filename

        if(!filename.includes('\\src\\')){
          return
         }
        
        const normalizedFilename =  getNormalizedCurrentFilePath(filename)
        
        const finalPath = normalizedFilename.replace('/', '')
        
        const {layer} = getLayerAndSegments(finalPath)

        const isIgnored = ignoreImportPatterns.some(pattern => {
          return micromatch.isMatch(value, pattern)
        });

        if(isIgnored) {
          return;
        }

        if(!availableLayers[layer] || !availableLayers[importLayer]){
          return
        }

        if(layers[layer].includes(importLayer)){
          return
        }else{
          context.report({
            node,
            messageId: ERROR,
            data: {
              name: availableLayers[layer],
              layers: layers[layer]
            }
          });
        }
      }
    }
  }
}
