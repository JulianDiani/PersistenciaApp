var express = require("express");
var router = express.Router();
var models = require("../models");
var authServices = require('../auth/authservices');

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  
  const paginaActual = parseInt(req.query.numeroDePagina);
  const limite = parseInt(req.query.cantidadAVer);

  models.alumno
    .findAll({
      attributes: ["id" , "nombre","dni"] ,
      include: [{ as: "Carrera-Relacionada", model: models.carrera, attributes: [ "id", "nombre"]}
    ],
      order: [  ['nombre', 'ASC']], // ORDENAMOS X ORDEN ALFABETICO
      offset: (paginaActual-1) * limite,
      limit: limite
    })
    .then(alumno => res.send(alumno))
    .catch(() => res.sendStatus(500));
});

router.post("/",authServices.verificacion, (req, res) => {
  models.alumno
    .create({ nombre: req.body.nombre , id_carrera: req.body.id_carrera,dni: req.body.dni })
    .then(alumno => res.status(201).send({ id: alumno.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otro alumno con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findAlumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: ["id", "nombre", "id_carrera","dni"],
      where: { id }
    })
    .then(alumno => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findAlumno(req.params.id, {
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id",authServices.verificacion, (req, res) => {
  const onSuccess = alumno =>
    alumno
      .update({ nombre: req.body.nombre, id_carrera: req.body.id_carrera,dni:req.body.dni },{ fields: ["nombre", "id_carrera"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otro alumno con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", authServices.verificacion,(req, res) => {
  const onSuccess = alumno =>
    alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


module.exports = router;
