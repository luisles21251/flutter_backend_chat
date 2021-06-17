const {Router} = require ('express');
const {validarJWT}= require('../middlewares/validar_jwt');
const {obtainChat} = require('../controller/messages');



const router = Router();



router.get('/:by', validarJWT, obtainChat);


module.exports = router;