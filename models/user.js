const {Schema, model} = require('mongoose')

// modelo de la base de datos

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'name is required']
    },
    mail:{
        type: String,
        required: [true, 'email is required'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'password is required']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state:{
        type: Boolean,
        required: true
    },
    google:{
        type: Boolean,
        required: false
    },
})

UserSchema.methods.toJSON =  function() { // debe ser una funcion normal, sobreescribimos este metodo
    const {__v , password, ...user} = this.toObject() // para que el __v y la password no las traiga
    return user
}

module.exports = model('User', UserSchema)