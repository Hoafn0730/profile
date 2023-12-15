const accountRouter = require('./account');

function routes(app) {
    app.use('/api/accounts/', accountRouter);
}

module.exports = routes;
