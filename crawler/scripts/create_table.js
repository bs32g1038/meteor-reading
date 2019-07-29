const { db } = require('../src/models');

db.sync({
    force: true,
});
