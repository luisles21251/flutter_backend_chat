const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require("../helper/json_web_tocken");



const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await User.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'el correo ya esta registrado'
            })
        }



        const user = new User(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);



        await user.save();

        //generar mi JWT

        const token = await generarJWT(user.id)




        res.json({
            ok: true,
            user,
            token

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'comuniquese con el administrador'


        });

    }


}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            });
        }

        //validar password 
        const valiPassword = bcrypt.compareSync(password, userDB.password);
        if (!valiPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña invalida'
            });
        }

        //generar JWT
        const token = await generarJWT(userDB.id);
        res.json({
            ok: true,
            user:userDB,
            token

        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'comuniquese con el admin'
        });

    }





}



const renewToken = async(req, res= response)=>{


    const uid =req.uid; 

    //generar nuevo JWT
    const token = await generarJWT(uid);

        //obtener usuario mediante uid

        const user = await User.findById(uid);


    res.json({
        ok:true,
        user,
        token
    })

}



module.exports = {
    crearUsuario,
    login,
    renewToken
}