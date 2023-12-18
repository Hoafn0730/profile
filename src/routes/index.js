var jwt = require('jsonwebtoken');

const Account = require('../models/account');
const accountRouter = require('./account');

function routes(app) {
    app.use('/api/accounts/', accountRouter);

    // [GET] /
    app.get('/', (req, res) => {
        const sess = req.session;
        if (sess.username && sess.password) {
            res.json(sess);
            // if (sess.username) {
            //     res.write(`<h1>Welcome ${sess.username} </h1><br>`);
            //     res.write(`<h3>This is the Home page</h3>`);
            //     res.end('<a href=' + '/logout' + '>Click here to log out</a >');
            // }
        }
        //  else {
        //     res.sendFile('D:/Workspace/NodeJS/restful_api/src/login.html');
        // }
    });

    // [POST] /login
    app.post('/login', (req, res) => {
        const sess = req.session;
        const username = req.body.username;
        const password = req.body.password;

        Account.findOne({ username, password })
            .then((data) => {
                if (data) {
                    var token = jwt.sign({ _id: data._id }, 'hoan');

                    sess.username = username;
                    sess.password = password;
                    res.json({ message: 'Dang nhap thanh cong', token });
                } else {
                    res.status(400).json('that bai');
                }
            })
            .catch((e) => res.status(500).json('loi'));
    });

    // [GET] /logout
    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/');
        });
    });

    const checkLogin = async (req, res, next) => {
        try {
            const token = req.headers.token;

            const decode = jwt.verify(token, 'hoan');
            const data = await Account.findById(decode._id).select('-password');
            if (data) {
                req.data = data;
                next();
            } else {
                res.json("user isn' exist");
            }
        } catch (e) {
            res.status(500).json('token khong hop le');
        }
    };

    // [GET] /private
    app.get('/private', checkLogin, (req, res) => {
        res.json({ message: 'Hello world!', data: req.data });
    });

    const checkStudent = (req, res, next) => {
        const role = req.data.role;
        if (['student', 'teacher', 'manager'].includes(role)) {
            next();
        } else {
            res.status(500).json('NOT PERMISSION');
        }
    };

    const checkTeacher = (req, res, next) => {
        const role = req.data.role;
        if (['teacher', 'manager'].includes(role)) {
            next();
        } else {
            res.status(500).json('NOT PERMISSION');
        }
    };

    const checkManager = (req, res, next) => {
        const role = req.data.role;
        if (role === 'manager') {
            next();
        } else {
            res.status(500).json('NOT PERMISSION');
        }
    };

    // [GET] /task
    app.get('/task', checkLogin, checkStudent, (req, res) => {
        res.json({ message: 'ALL task', data: req.data });
    });

    // [GET] /student
    app.get('/student', checkLogin, checkTeacher, (req, res) => {
        res.json({ message: 'STUDENT', data: req.data });
    });

    // [GET] /teacher
    app.get('/teacher', checkLogin, checkManager, (req, res) => {
        res.json({ message: 'TEACHER', data: req.data });
    });
}

module.exports = routes;
