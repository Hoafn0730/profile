const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/hoan');

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
        username: String,
        password: String,
    },
    { collection: 'account' },
);

module.exports = mongoose.model('account', AccountSchema);
