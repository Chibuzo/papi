'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_name: DataTypes.STRING(45),
        role: DataTypes.STRING(20),
        user_id: DataTypes.INTEGER,
        password: DataTypes.STRING
    }, {
        tableName: 'users'
    });

    return User;
}