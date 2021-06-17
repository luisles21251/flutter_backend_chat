const { comprobarJWT } = require('../helper/json_web_tocken');
const { io } = require('../index');
const{userConnect, userDisconnect, saveMesage}= require('../controller/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');


  
    console.log('cliente autenticado');
    const [valido , uid ] = comprobarJWT(client.handshake.headers['x-token']);

//verificar autenticacion
    if(!valido) { return client.disconnect();}
   
    //cliente autenticado

    userConnect(uid);

    //ingresando el usuario a una sala
    client.join(uid);

    //escuchar del cliente
    client.on('mensaje-personal', async (payload)=> {

        await saveMesage(payload);
        

     io.to(payload.for).emit('mensaje-personal',payload);


    })

    



    client.on('disconnect', () => {
       userDisconnect(uid);
    });

   /* client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });*/


});
