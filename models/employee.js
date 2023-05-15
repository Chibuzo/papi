'use strict';

module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        first_name: DataTypes.STRING(45),
        last_name: DataTypes.STRING(45),
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        phone: DataTypes.STRING(10),
        department: DataTypes.STRING(85)
    }, {
        tableName: 'employees',
        indexes: [
            { unique: true, fields: ['email'] },
            { unique: true, fields: ['phone'] }
        ]
    });

    return Employee;
}