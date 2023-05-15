'use strict';

module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        first_name: DataTypes.STRING(45),
        last_name: DataTypes.STRING(45),
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        phone: DataTypes.STRING(10),
        department: DataTypes.STRING(85),
        permission: DataTypes.INTEGER
    }, {
        tableName: 'students',
        indexes: [
            { unique: true, fields: ['email'] },
            { unique: true, fields: ['phone'] }
        ]
    });

    return Student;
}