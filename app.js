var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var methodOverride=require("method-override");
var passport=require("passport");
var session=require("express-session");
var localStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");
var MongoStore=require("connect-mongo")(session);
var product=require("./models/product");
var User=require("./models/user");
var Cart=require("./models/cart");
var seed=require("./seed");
var paypal = require('paypal-rest-sdk');
var cost=0;

//seed();

mongoose.connect("mongodb://localhost/e_cart");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

app.use(require("express-session")({
	secret:"We will rock you",
	resave:false,
	saveUninitialized: false,
	store: new MongoStore({mongooseConnection:mongoose.connection}),
	cookie:{maxAge:5*60*1000}
}))

passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.session=req.session;
	next();
})


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AZzMgB5d9Bksue3OchW4rCnZgK1M_IkOM3_H3druDETvF_ObY44_mNACSjQ4K46fTsu9Nha8vzjevIF1',
  'client_secret': 'EHpIzLpBQdsuIEFTx7AiZSGOKvQOQxsKt_xDdAt0HakLX6roh8cwPUxE4WOeP0qk32XlyJ3coZ0YvzEM'
});

app.get("/",function(req,res){
	res.render("select.ejs");
})

app.get("/shop/:id",function(req,res){
	var cart = new Cart(req.session.cart ? req.session.cart : {items:{},totalQty:0,totalPrice:0});
	req.session.cart=cart;
	console.log(req.params.id);
	product.find({},function(err,gameCD){
		if(err){
			console.log(err);
		}
		else
		{
			res.render("home.ejs",{gameCD:gameCD,nam:req.params.id});
			// console.log(gameCD);
			// if (gameCD.parent==req.params.id)
			// arr.push(gameCD);
		}
	});
	
})

app.get("/shopping-cart",function(req,res){
	if(!req.session.cart){
		return res.render("shop/shopping-cart.ejs",{products:null});
	}
	var cart=new Cart(req.session.cart);
	res.render("shop/shopping-cart.ejs",{products: cart.generateArray(), totalPrice: cart.totalPrice});
})

app.get("/checkout",isLoggedIn,function(req,res){
	if(!req.session.cart){
		return res.render("shop/shopping-cart.ejs",{products:null});
	}
	var cart=new Cart(req.session.cart);
	res.render("shop/checkout.ejs",{total:cart.totalPrice});
})

app.get("/addToCart/:id/:parent",function(req,res){
	var productId=req.params.id;
	var productParent=req.params.parent;
	var cart = new Cart(req.session.cart ? req.session.cart : {items:{},totalQty:0,totalPrice:0});
	
	product.findById(productId ,function(err, product){
		if(err){
			console.log(err);
		}
		cart.add(product, product.id);
		req.session.cart =cart;
		console.log(req.session.cart);
		res.redirect("/shop/"+productParent);
	})
})

app.get("/remove/:id/:parent",function(req,res){
	var productId=req.params.id;
	var productParent=req.params.parent;
	var cart = new Cart(req.session.cart ? req.session.cart : {items:{},totalQty:0,totalPrice:0});
	
	product.findById(productId ,function(err, product){
		if(err){
			console.log(err);
		}
		cart.remove(product, product.id);
		req.session.cart =cart;
		console.log(req.session.cart);
		res.redirect("/shop/"+productParent);
	})
})

// app.get("/remove-by-1/:id",function(req,res){
// 	var getProduct=req.params.id;
// 	console.log(getProduct);
// 	res.redirect("/shopping-cart");
// })

app.get("/user/profile",isLoggedIn,function(req,res){
	res.render("user/profile.ejs");
})

app.get("/user/signin",function(req,res){
	res.render("user/signin.ejs");
})

app.post("/user/signin",function(req,res){
	req.body.username;
	req.body.password;
	User.register(new User({username: req.body.username}) ,req.body.password ,function(err,user){
		if(err){
			console.log(err);
			return res.render("user/signin.ejs");
		}
		
		passport.authenticate("local")(req,res,function(){
			res.redirect("/user/profile");
		})
	})
})

app.post("/pay",function(req,res){
	cost=req.body.amount;
	const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:8080/success",
        "cancel_url": "http://localhost:8080/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "red sox",
                "sku": "001",
                "price": cost,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": cost
        },
        "description": "This is the payment description."
    }]
};
console.log(cost);
paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
    }
});

})

app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
 // cost=req.body.amount;
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": cost
        }
    }]
  };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.render('success.ejs');
    }
});
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

app.get("/user/login",function(req,res){
	res.render("user/login.ejs");
})

app.post("/user/login",passport.authenticate("local",{
	successRedirect:"/user/profile",
	failureRedirect:"/user/login"
}),function(req,res){})

app.get("/logout",function(req,res){
	req.session.destroy();
	req.logout();
	res.redirect("/");
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/user/login");
}

app.listen(8080,function () {
	console.log("server started!");
})
