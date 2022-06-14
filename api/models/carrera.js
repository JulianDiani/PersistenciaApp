'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});

  carrera.associate = function(models) {
  	carrera.hasMany(models.materia,  // Modelo al que pertenece
    {
      as: 'materias-de-la-carrera',                 // nombre de mi relacion
      foreignKey: 'id_carrera'       // campo con el que voy a igualar 
    })
  };


  
  return carrera;
};