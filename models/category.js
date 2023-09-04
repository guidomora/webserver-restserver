const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "the name is required"],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, // el object id apunta
    ref: "User", //aca, tal cual lo definimos en el modelo para el usuario
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  // debe ser una funcion normal, sobreescribimos este metodo
  const { __v, state, ...data } = this.toObject(); // para que el __v no se muestre
  return data;
};

module.exports = model("Category", CategorySchema);
