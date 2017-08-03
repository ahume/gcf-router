const route = require('path-match')();

function doesNotMatchRootSlash(req, path) {
  const cloudFunctionPath = req.originalUrl.replace(req.baseUrl, '');
  return (cloudFunctionPath === '/' && path === '') ||
    (cloudFunctionPath === '' && path === '/');
}

function router(method, path, handler) {
  return function app(req, res) {

    // 501 if not the right method.
    if (req.method !== method) {
      return res.status(501).send();
    }

    // 404 if single root slash does not match
    if (doesNotMatchRootSlash(req, path)) {
      return res.status(404).send();
    }

    // Otherwise find any params
    const match = route(path);
    const params = match(req.path);

    if (params === false) {
      return res.status(404).send();
    }

    return handler(req, res);
  };
}

module.exports = router;
