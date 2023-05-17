const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const userService = require('../services/userService');
const internshipService = require('../services/internshipService');


router.get('/', async (req, res, next) => {
    try {
        const internships = await internshipService.list();
        res.render('index', { title: 'Welcome', internships });
    } catch (err) {
        next(err);
    }
});


router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});


router.post('/login', async (req, res, next) => {
    try {
        const userpage = {
            organization: '/list-internships',
            student: '/',
            employee: '/applications'
        }
        req.session.user = await userService.login(req.body);
        res.redirect(userpage[req.session.user.role]);
    } catch (err) {
        next(err);
    }
});

router.get('/organization/signup', async (req, res, next) => {
    res.render('org_signup', { title: 'Organization Sign up' });
});

router.get('/student/signup', async (req, res, next) => {
    res.render('student_signup');
});

router.get('/employee/signup', async (req, res, next) => {
    res.render('employee_signup');
});

router.post('/signup', async (req, res, next) => {
    try {
        const resp = await userService.createUser(req.body);
        res.render('confirmation', { signup: true });
    } catch (err) {
        next(err);
    }
});

router.get('/list-internships', authenticate, async (req, res, next) => {
    try {
        const { user_id: organization_id } = req.session.user;
        const internships = await internshipService.list('organization_id', organization_id);
        res.render('user/internships', { internships, role: req.session.user.role });
    } catch (err) {
        next(err);
    }
});

router.get('/new-internship', async (req, res, next) => {
    res.render('user/new-internship');
});

router.post('/new-internship', authenticate, async (req, res, next) => {
    try {
        const { user_id: organization_id } = req.session.user;
        await internshipService.create({ ...req.body, organization_id });
        res.redirect('/list-internships');
    } catch (err) {
        next(err);
    }
});

router.get('/apply', authenticate, async (req, res, next) => {
    try {
        const { id } = req.query;
        const resp = await internshipService.apply(id, req.session.user.user_id);
        res.render('confirmation', { apply: true });
    } catch (err) {
        next(err);
    }
});

router.get('/applications', authenticate, async (req, res, next) => {
    try {
        const applications = await internshipService.listApplications();
        res.render('user/applications', { applications, role: req.session.user.role });
    } catch (err) {
        next(err);
    }
});

router.get('/organizations', authenticate, async (req, res, next) => {
    try {
        const organizations = await userService.listOrganizations();
        res.render('user/organizations', { organizations, role: req.session.user.role });
    } catch (err) {
        next(err);
    }
});

router.get('/students', authenticate, async (req, res, next) => {
    try {
        const students = await userService.listStudents();
        res.render('user/students', { students, role: req.session.user.role });
    } catch (err) {
        next(err);
    }
});


router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;
