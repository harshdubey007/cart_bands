var mongoose=require("mongoose");
var Product=require("./models/product");

var products=[
	{
		image: "https://i.pinimg.com/474x/e7/f1/18/e7f11848ed39d145a142843aaa5aaf14--rock-posters-concert-posters.jpg",
		title: "Time",
		price: 1,
		parent:"pinkFloyd"
	},

	{
		image: "https://i.pinimg.com/474x/e7/f1/18/e7f11848ed39d145a142843aaa5aaf14--rock-posters-concert-posters.jpg",
		title: "Time",
		price: 2,
		parent:"pinkFloyd"
	},

	{
		image: "https://i.pinimg.com/564x/1a/dd/69/1add69fb6f74cf3384ce9787f73549a3.jpg",
		title: "Live At Pompeii",
		price: 2,
		parent:"pinkFloyd"
	},

	{
		image:"https://i.pinimg.com/564x/5c/7d/b8/5c7db844eab1c6dc1550e312c3ec1fac.jpg",
		title:"The Wall",
		price: 2.5,
		parent:"pinkFloyd"
	},

	{
		image:"https://i.pinimg.com/564x/ad/bd/2d/adbd2d634db429beb4fd383ee511dfd5.jpg",
		title:"The Dark Side Of The Moon",
		price: 3,
		parent:"pinkFloyd"
	},
	{
		image: "https://i.pinimg.com/474x/e7/f1/18/e7f11848ed39d145a142843aaa5aaf14--rock-posters-concert-posters.jpg",
		title: "Time",
		price: 1,
		parent:"Metallica"
	},

	{
		image: "https://i.pinimg.com/474x/e7/f1/18/e7f11848ed39d145a142843aaa5aaf14--rock-posters-concert-posters.jpg",
		title: "Time",
		price: 2,
		parent:"Metallica"
	},

	{
		image: "https://i.pinimg.com/564x/1a/dd/69/1add69fb6f74cf3384ce9787f73549a3.jpg",
		title: "Live At Pompeii",
		price: 2,
		parent:"Metallica"
	},

	{
		image:"https://i.pinimg.com/564x/5c/7d/b8/5c7db844eab1c6dc1550e312c3ec1fac.jpg",
		title:"The Wall",
		price: 2.5,
		parent:"Metallica"
	},

	{
		image:"https://i.pinimg.com/564x/ad/bd/2d/adbd2d634db429beb4fd383ee511dfd5.jpg",
		title:"The Dark Side Of The Moon",
		price: 3,
		parent:"Metallica"
	},
	{
		image: "https://i.pinimg.com/474x/e7/f1/18/e7f11848ed39d145a142843aaa5aaf14--rock-posters-concert-posters.jpg",
		title: "Time",
		price: 1,
		parent:"LedZepplin"
	},

	{
		image: "https://i.pinimg.com/474x/e7/f1/18/e7f11848ed39d145a142843aaa5aaf14--rock-posters-concert-posters.jpg",
		title: "Time",
		price: 2,
		parent:"LedZepplin"
	},

	{
		image: "https://i.pinimg.com/564x/1a/dd/69/1add69fb6f74cf3384ce9787f73549a3.jpg",
		title: "Live At Pompeii",
		price: 2,
		parent:"LedZepplin"
	},

	{
		image:"https://i.pinimg.com/564x/5c/7d/b8/5c7db844eab1c6dc1550e312c3ec1fac.jpg",
		title:"The Wall",
		price: 2.5,
		parent:"LedZepplin"
	},

	{
		image:"https://i.pinimg.com/564x/ad/bd/2d/adbd2d634db429beb4fd383ee511dfd5.jpg",
		title:"The Dark Side Of The Moon",
		price: 3,
		parent:"LedZepplin"
	},
	{
		image: "https://i.pinimg.com/474x/e7/f1/18/e7f11848ed39d145a142843aaa5aaf14--rock-posters-concert-posters.jpg",
		title: "Time",
		price: 1,
		parent:"RedHotChilliPepper"
	},

	{
		image: "https://i.pinimg.com/474x/e7/f1/18/e7f11848ed39d145a142843aaa5aaf14--rock-posters-concert-posters.jpg",
		title: "Time",
		price: 2,
		parent:"RedHotChilliPepper"
	},

	{
		image: "https://i.pinimg.com/564x/1a/dd/69/1add69fb6f74cf3384ce9787f73549a3.jpg",
		title: "Live At Pompeii",
		price: 2,
		parent:"RedHotChilliPepper"
	},

	{
		image:"https://i.pinimg.com/564x/5c/7d/b8/5c7db844eab1c6dc1550e312c3ec1fac.jpg",
		title:"The Wall",
		price: 2.5,
		parent:"RedHotChilliPepper"
	},

	{
		image:"https://i.pinimg.com/564x/ad/bd/2d/adbd2d634db429beb4fd383ee511dfd5.jpg",
		title:"The Dark Side Of The Moon",
		price: 3,
		parent:"RedHotChilliPepper"
	},
	{
		image: "https://i.pinimg.com/474x/e7/f1/18/e7f11848ed39d145a142843aaa5aaf14--rock-posters-concert-posters.jpg",
		title: "Time",
		price: 1,
		parent:"GunsNRoses"
	},

	{
		image: "https://i.pinimg.com/474x/e7/f1/18/e7f11848ed39d145a142843aaa5aaf14--rock-posters-concert-posters.jpg",
		title: "Time",
		price: 2,
		parent:"GunsNRoses"
	},

	{
		image: "https://i.pinimg.com/564x/1a/dd/69/1add69fb6f74cf3384ce9787f73549a3.jpg",
		title: "Live At Pompeii",
		price: 2,
		parent:"GunsNRoses"
	},

	{
		image:"https://i.pinimg.com/564x/5c/7d/b8/5c7db844eab1c6dc1550e312c3ec1fac.jpg",
		title:"The Wall",
		price: 2.5,
		parent:"GunsNRoses"
	},

	{
		image:"https://i.pinimg.com/564x/ad/bd/2d/adbd2d634db429beb4fd383ee511dfd5.jpg",
		title:"The Dark Side Of The Moon",
		price: 3,
		parent:"GunsNRoses"
	}
]
// product.push(pinkFloyd);
// product.push(Metallica);
// product.push(LedZepplin);
// product.push(RedHotChilliPepper);
// product.push(GunsNRoses);
function seed(){
	 Product.remove({},function(err){
	 	console.log(err);
	 })

	console.log("removed");

	for(var i=0;i<products.length;i++){
		Product.create(products[i],function(err,product){
			if(err){
				console.log(err);
			}else{
				console.log("Added");
			}
		})
	}
}

module.exports=seed;