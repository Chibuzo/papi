'use strict';

module.exports = (sequelize, DataTypes) => {
    const Internship = sequelize.define('Internship', {
        title: DataTypes.STRING(150),
        industry: DataTypes.STRING(45),
        details: DataTypes.TEXT,
        status: {
            type: DataTypes.STRING,
            defaultValue: 'active'
        },
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        organization_id: DataTypes.INTEGER
    }, {
        tableName: 'internships',
        timestamps: false
    });

    return Internship;
}