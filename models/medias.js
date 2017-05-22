//grab the things need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// crate a Schema
var mediaSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true
    },
	subtitle: {
      type: String
    },
	description:{
	  type:String
	},
    image: {
      type: String,
      required: true
    },
	featured: {
        type: Boolean,
        default:false
    },
	orientation: {
	  type: String,
      enum : ['vertical','horizontal'],
      required: true
	}
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Medias = mongoose.model('Media', mediaSchema);

// make this available to our Node application
module.exports = Medias;
