'use strict';

module.exports = (sequelize, DataTypes) => {
    const InternshipApplication = sequelize.define('InternshipApplication', {
        student_id: DataTypes.INTEGER,
        internship_id: DataTypes.INTEGER,
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'internshipApplications',
        timestamps: false
    });

    return InternshipApplication;
}