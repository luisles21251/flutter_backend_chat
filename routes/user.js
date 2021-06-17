/*

path:api/user

*/


const { getUser} =require ('../controller/users');
const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router(); 


router.get('/',validarJWT, getUser );



module.exports =router;
