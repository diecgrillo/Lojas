//grab the things need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// crate a Schema
var productSchema = new Schema({
    name: {
      type: String,
      required: true,
      default: ""
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Image'
    },
    category:{
      required: true,
      type: String,
      default: ""
    },
    brand:{
      required: true,
      type:String,
      default: ""
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Products = mongoose.model('Product', productSchema);

// make this available to our Node application
module.exports = Products;
