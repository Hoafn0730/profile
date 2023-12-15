const express = require('express');
const path = require('path');

const Account = require('./models/account');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

// app.post('/login', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//
//     Account.findOne({ username, password })
//         .then((data) => {
//             if (data) {
//                 res.json('thanh cong');
//             } else {
//                 res.status(400).json('that bai');
//             }
//         })
//         .catch((e) => res.status(500).json('loi'));
// });

app.listen(port, () => {
    console.log(`Example app listening on port: http://localhost:${port}`);
});
