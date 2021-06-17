
const { Schema, model } = require('mongoose');


const MessageSchema = Schema({

    by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },

    for: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true


    },

    mensaje:{
        type: String,
        required:true

    }


},{
    timestamps:true
}


);

MessageSchema.method('toJSON', function(){
    const {  __v, _id,...object}= this.toObject();
    return object;
})

module.exports = model('Message', MessageSchema);