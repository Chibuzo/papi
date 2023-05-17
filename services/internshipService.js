const { Internship, InternshipApplication, sequelize } = require('../models');

const create = async (data) => {
    return Internship.create(data);
}

const list = async (criteria, value) => {
    let where = '';
    let sql = `SELECT i.title, i.details, i.start_date, i.end_date, i.status, o.name organization, o.industry
                FROM internships i 
                JOIN organizations o ON o.id = i.organization_id`;

    if (criteria) sql += ` WHERE ${criteria} = ${value}`;
    const [internships] = await sequelize.query(sql);
    return internships;
}

const apply = async (internship_id, student_id) => {
    return InternshipApplication.create({ internship_id, student_id });
}

const listApplications = async () => {
    const [data] = await sequelize.query(`SELECT CONCAT(u.first_name, ' ', u.last_name) student_name, ia.date, i.title, i.start_date, i.end_date, o.name organization, o.industry
        FROM internshipApplications ia 
        LEFT JOIN students u ON u.id = ia.student_id
        LEFT JOIN internships i ON i.id = ia.internship_id
        LEFT JOIN organizations o ON o.id = i.organization_id`);

    return data;
}

module.exports = {
    create,
    list,
    apply,
    listApplications
}