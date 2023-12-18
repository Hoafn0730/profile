const jwt = require('jsonwebtoken');
const fs = require('fs');

// var privateKey = fs.readFileSync('./key/private.pem');
// var token = jwt.sign({ name: 'hoan' }, privateKey, { algorithm: 'RS256' });
const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaG9hbiIsImlhdCI6MTcwMjcyNTc3OH0.6_4Dd0sFcNjHke-vCY074W-dvDe41ny7QLMwge_b3kcKVdrFOZCYyrjXFC6KR1x4a0OEx1bojHtPAxrAW73dJaC1guTDCE0YISO0UGikpluOH00z963mhvnlnIbC62XVfnKW38pH1CcjvRoEeLWmGVpYOK_AT-wys9AoIAa7s8HqDYjj5qFL9g0aRBFpat_--JYNXnQMn5gHJGLEF3Lthv1-wC1gENp1Zo7TfZayq15LXtGCepPvdkD9vDsLrMdV18HcXtBZhLvyPhRXmH9Jzh1rptr_bAjnNdiQbPqnUkEhXwkY_wYiEqA0SFGhMw5nyy0BcqGl9h5tJ1nOdd8bog';

var cert = fs.readFileSync('./key/publickey.crt');
jwt.verify(token, cert, { algorithms: ['RS256'] }, function (err, decoded) {
    console.log('🚀 ~ file: demo.js:9 ~ err:', err);
    console.log(decoded); // bar
});
