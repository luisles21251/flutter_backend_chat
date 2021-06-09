/*

path:api/login

*/



const {Router} = require('express');
const { check } = require('express-validator');
const {crearUsuario, login, renewToken} = require ('../controller/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router(); 

router.post('/new', [
    check('nombre', 'el nombre es obliogatorio').not().isEmpty(), 
    check('password', 'el password es incorrecto').not().isEmpty(),
    check('email', 'el correo es obligatorio').isEmail(),
    
    validarCampos,


],crearUsuario);


router.post('/', [
    check('email', 'el email no esta asociado a ninguna cuenta').isEmail(),
    check('password','la comtraseña es incorrecta').not().isEmpty(),
], login);

//validarJWT
router.get('/renew',validarJWT,renewToken );



module.exports =router;
