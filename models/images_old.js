//grab the things need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// crate a Schema
var imageSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    imagem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Imagens'
    },
    categoria:{
      required: true,
      type: String,
      default: ""
    },
    marca:{
      required: true,
      type:String,
      default: ""
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Images = mongoose.model('Image', imageSchema);

// make this available to our Node application
module.exports = Images;
