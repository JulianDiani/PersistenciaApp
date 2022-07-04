'use strict';
module.exports = (sequelize, DataTypes) => {
  const empleadoAdmin = sequelize.define('empleadoAdmin', {
    usuario: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  empleadoAdmin.associate = function(models) {
    // associations can be defined here
  };
  return empleadoAdmin;
};