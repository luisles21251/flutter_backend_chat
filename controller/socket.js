
const User = require('../models/user');
const Message = require('../models/message');

const userConnect =  async( uid ='')=>{

    const user = await User.findById(uid);

    user.online = true;
    await user.save();
    console.log(user);


    return user;
 
}

const userDisconnect= async (uid = '') =>{

const user = await User.findById(uid);
user.online = false;
await user.save();
console.log(user);
return user;

}


const saveMesage = async (payload)=>{

try{
    const message = new Message(payload);
    await message.save();
    console.log(payload);
    return true;
}catch(error){
    return false;
}

}




module.exports={
    userConnect,
    userDisconnect,
     saveMesage 
    
}