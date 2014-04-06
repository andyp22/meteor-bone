/**
 * Store server configurations here.
 */
/**
 * BrowserPolicy configurations.
 * @private
 */
// Disallow inline acript tags.
BrowserPolicy.content.disallowInlineScripts();
// Allow the client to load content from these URLs.
BrowserPolicy.content.allowOriginForAll('*.googleusercontent.com');
BrowserPolicy.content.allowOriginForAll('*.googleapis.com');