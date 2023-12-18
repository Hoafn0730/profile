const express = require('express');

const Account = require('../models/account');

const router = express.Router();
const PAGE_SIZE = 2;

// [GET]
router.get('/', async (req, res) => {
    let page = req.query.page;
    try {
        if (page) {
            page = Number(page) < 1 ? 1 : Number(page);
            const skip = (page - 1) * PAGE_SIZE;
            const data = await Account.find({}).skip(skip).limit(PAGE_SIZE);
            if (data) {
                res.json(data);
            } else {
                res.json('not data');
            }
        } else {
            // get all
            const data = await Account.find({});
            if (data) {
                res.json(data);
            } else {
                res.json('not data');
            }
        }
    } catch (e) {
        res.status(500).json('loi server');
    }
});

// [GET]
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Account.findOne({ _id: id })
        .then((data) => res.json(data))
        .catch((e) => res.status(500).json('loi server'));
});

// [POST]
router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Account.findOne({
        username,
    })
        .then((data) => {
            if (data) {
                res.status(200).json({ message: 'da toi tai' });
            } else {
                return Account.create({ username, password });
            }
        })
        .then((data) => {
            res.status(200).json({ message: 'tao thanh cong', data });
        })
        .catch((e) => res.status(500).json({ message: 'that bai' }));
});

// [PUT]
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const newPassword = req.body.password;

    Account.findByIdAndUpdate(id, {
        password: newPassword,
    })
        .then((data) => {
            res.json('update thanh cong');
        })
        .catch((e) => res.status(500).json('loi'));
});

// [DELETE]
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Account.deleteOne({ _id: id })
        .then((data) => res.json('xoas thanh cong'))
        .catch((e) => res.status(500).json('loi'));
});

module.exports = router;
