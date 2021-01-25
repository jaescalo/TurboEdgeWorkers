/// <reference types="akamai-edgeworkers"/>
import pkg from 'log';
const { logger } = pkg;

export function onOriginResponse(request, response) {
    // Call function to set the Edge-Cache-Tag Header
    response.setHeader('Edge-Cache-Tag', getCacheTagsForPath(request.path));
}

export function onClientResponse(request, response) {
    logger.log("Adding a header in ClientResponse");
    response.setHeader('My-Edge-Cache-Tag', sum(10,20));
    response.setHeader('Get-Cache-Tags-For-Path', getCacheTagsForPath(request.path))
}

// Get the Cache Tag value based on the request path
function getCacheTagsForPath(path) {
    const cacheTagPrefix = 'path--';
    const cacheTagFolderSeparator = '|';
    const folderNames = path.split('/');
    const cacheTags = [];
    for (let i = 1; i < folderNames.length; i++) {
        cacheTags.push(cacheTagPrefix + cacheTagFolderSeparator + folderNames.slice(1, i + 1).join(cacheTagFolderSeparator));
    }
    logger.log("Responding with hello message from the path: %s", cacheTags.join(','))
    return '' + cacheTags.join(',');
}

export function sum(a, b) {
    return a + b;
}
