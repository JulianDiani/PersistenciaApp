var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var carrerasRouter = require('./routes/carreras');
var materiasRouter = require('./routes/materias');
var alumnosRouter = require('./routes/alumnos');
var empleadosAdminRouter=require('./routes/empleadosAdmin');
//var loginRouter=require('./routes/login');
const jwt=require('jsonwebtoken');
const keys= require('./settings/keys')




var app = express();
app.set('key',keys.key)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/car', carrerasRouter);
app.use('/mat', materiasRouter);
app.use('/alu', alumnosRouter);
app.use('/emp', empleadosAdminRouter);
//app.use('/login', loginRouter);

// catch 404 and forward to error handler
/*app.post('/log',(req,res)=>{
  if (req.body.usuario=='admin'&& req.body.password=='admin'){
    const payload={
        check:true
    };
    const token =jwt.sign(payload,app.get('key'),{
        expiresIn :'7d'
    })
    res.json({
        message:"autenticado",
        token: token
    })
}else{
    res.json({
        message:"Password incorrecta"
    })
}
});
const verificacion= express.Router();
verificacion.use((req,res,next)=>{
  let token= req.headers['x-access-token'] || req.headers['authorization'];
  if(!token){
    res.status(401).send({
      error:"Es necesario un token de acceso."
    })
    return;
  }
  if (token.startsWith('Bearer ')){
    token=token.slice(7,token.length)
    console.log(token)
  }
  if (token){
    jwt.verify(token,app.get('key'),(error,decoded)=>{
      if(error){
        return res.json({
          message:"El token no es valido"
        })
      } else {
        req.decoded=decoded
        next();
      }
    })
  }

});*/
/*app.get('/info',verificacion,(req,res)=>{
  res.json('hola')
})*/

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
