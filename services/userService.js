const { Organization, Student, Employee, User, sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { ErrorHandler } = require('../helpers/errorHandler');

const userModels = {
    organization: Organization,
    student: Student,
    employee: Employee
};

const createUser = async userData => {
    const user = await userModels[userData.role].create({ ...userData });
    const password = await bcrypt.hash(userData.password, saltRounds);
    await User.create({ ...userData, user_id: user.id, password });
    return user;
}


const login = async ({ user_name, password }) => {
    const user = await User.findOne({
        where: { user_name },
        attributes: ['id', 'user_id', 'user_name', 'password', 'role'],
        raw: true
    });

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ErrorHandler(400, 'Email and password doesn\'t match');

    delete user.password;
    return user;
}

const listStudents = async () => {
    const sql = `SELECT COUNT(*) internships, s.* FROM students s JOIN internshipapplications ia ON ia.student_id = s.id GROUP BY student_id`;
    const [students] = await sequelize.query(sql);
    return students;
}

const listOrganizations = async () => {
    const sql = `SELECT COUNT(*) internships, o.* FROM organizations o JOIN internships i ON i.organization_id = o.id GROUP BY organization_id`;
    const [organizations] = await sequelize.query(sql);
    return organizations;
}

module.exports = {
    login,
    createUser,
    listStudents,
    listOrganizations
}