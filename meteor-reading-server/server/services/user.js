const models = require('../models');

exports.register = async (email, password) => {
    let user = await models.user.findOne({
        where: {
            email,
        },
    });
    if (user) {
        return 1;
    }
    user = await models.user.create({
        email,
        password,
    });
    return {
        id: user.id,
    };
};

exports.login = async (email, password) => {
    let user = await models.user.findOne({
        where: {
            email,
            password,
        },
    });
    return user;
};
