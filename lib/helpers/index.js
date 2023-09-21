const path = require("path");

function isPathRelative(path){
    return path === '.' || path.startsWith('./') || path.startsWith('../')
}

function getLayerAndSegments(path){
    const segments = path.split('/')
       const layer = segments[0]
       const slice = segments[1]

       return {layer, slice, segments}
}

function getNormalizedCurrentFilePath(currentFilePath) {
    const normalizedPath = path.toNamespacedPath(currentFilePath);
    const projectFrom = normalizedPath.split('src')[1];
    return projectFrom.split('\\').join('/')
  }

module.exports = {
    isPathRelative,
    getLayerAndSegments,
    getNormalizedCurrentFilePath
}