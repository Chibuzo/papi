'use strict';

module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('Organization', {
        name: DataTypes.STRING(45),
        industry: DataTypes.STRING(45),
        phone: {
            type: DataTypes.STRING
        },
        join_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'organizations',
        timestamps: false
    });

    return Organization;
}