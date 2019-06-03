var mongoose=require("mongoose");

var productSchema=new mongoose.Schema({

	image:String,
	title:String,
	price:Number,
	parent:String

});

module.exports= mongoose.model("Product",productSchema);