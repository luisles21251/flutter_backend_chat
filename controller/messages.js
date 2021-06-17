
const { response } = require('express');
const Message = require('../models/message');


const obtainChat = async  (req, res = response)=>{

    const myIud = req.uid;
    const messageBy = req.params.by;

    const last30 = await Message.find({

        $or:[
            {
                by:myIud, for:messageBy
            },
            {by:messageBy, for:myIud }
        ]

    })
    .sort({ createdAt : 'desc'}).limit(30);

    res.json({
        ok:true,
        messages:last30


    });


}

module.exports = {
obtainChat

}