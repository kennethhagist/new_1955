const nineteenFiftyFiveController = require('../controllers/new_1955');

module.exports = function(app) {
    app.get('/', nineteenFiftyFiveController.index);
    app.get('/new/:name', nineteenFiftyFiveController.create);
    app.get('/remove/:name', nineteenFiftyFiveController.destory);
    app.get('/:name', nineteenFiftyFiveController.show);
};