module.exports =function Cart(oldItem){
	this.items = oldItem.items||{};
	this.totalQty =	oldItem.totalQty||0;
	this.totalPrice = oldItem.totalPrice||0;

	this.add= function(item,id){
		var storedItem=this.items[id];
		if(!storedItem){
			storedItem = this.items[id] = {item: item ,qty:0 ,price: 0};
		}
		storedItem.qty++;
		storedItem.price = storedItem.item.price*storedItem.qty;
		this.totalQty++;
		this.totalPrice += storedItem.item.price;
	};

		this.remove= function(item,id){
		var storedItem=this.items[id];
		if(!storedItem){
				storedItem = this.items[id] = {item: item ,qty:0 ,price: 0};
			}
		if(storedItem.qty!=0){
		
			
			storedItem.qty--;
			storedItem.price = storedItem.item.price*storedItem.qty;
			this.totalQty--;
			this.totalPrice -= storedItem.item.price;

	}
	};

	this.generateArray =function(){
		var arr=[];
		for(var id in this.items){
			arr.push(this.items[id]);
		}
		return arr;
	};
};

