//grab the things need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// crate a Schema
var imageSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    featured: {
        type: Boolean,
        default:false
    },
	orientation:{
	  type: String,
      enum : ['vertical','horizontal'],
      required: true
	},
  categoria:{
    type: String,
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
