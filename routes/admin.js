const express = require('express');
const User = require('../schemas/user');

const utils = require('../utils');
const setting = require('../setting.json');

const app = express.Router();

app.get('/admin', utils.isAdmin, (req, res, next) => {
    res.render('admin');
    return;
});

app.get('/admin/:page', utils.isAdmin, async (req, res, next) => {
    switch(req.params.page) {
        case 'user':
            if(req.query.id == '' || req.query.id == null) res.render('admin-user-menu');
            else {
                const user = await User.findOne({ fullID : req.query.id });
                if(user == null) {
                    req.flash('Error', '해당 유저를 찾을 수 없습니다.');
                    return res.redirect('/admin/user');
                }

                res.render('admin-user-edit', {
                    edituser: user
                });
            }
            return;
        case 'mail':
            res.render('admin-mail');
            return;
        default:
            res.redirect('/admin');
            return;
    }
});

module.exports = app;