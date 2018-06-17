var cart ={}; //korzina


$.getJSON('goods.json',function(data){ //zagrujaem json file
	var goods = data; // suda budu skladivati soderjimoe json fila, vse tovari korzini
	checkCart();
	//console.log(cart);
	showCart(); //vivoju tovari na stranitu

	function showCart(){
		//vizualizirovati korzinu
		if(!isEmpty(cart)){
			//korzina pusta
			var img = new Image();
			img.src = "img/cartempty.png";		
			$('#my-cart').html(img);

		}else{ //esli ne pusta budet vipolniatsa vizualizatia
		var out ='';
		for (var key in cart){
			
			out+='<img src="'+ goods[key].image +'" width="100">';
			out+=goods[key].name;
			out+= '<button class="minus" data-art="'+key+'">-</button> ';
			out+=cart[key];
			out+= '<button class="plus" data-art="'+key+'">+</button> ';
			out+=cart[key]*goods[key].cost+' лей';
			out+= '<button class="delete" data-art="'+key+'">Удалить</button> ';
			out+='<br>';
			out+= 'Наличие: '+ (5 - cart[key]);
			out+='<hr>';
			out+='<br>';
		}
		
		//out+= '<h4>'+'Итого: '+cart[key]*goods[key].cost+' лей'+'<h4>';
		
		$('#my-cart').html(out);
		$('.plus').on('click', plusGoods);
		$('.minus').on('click', minusGoods);
		$('.delete').on('click', deleteGoods);
		summ();
		}
	}

	function plusGoods(){
		var articul = $(this).attr('data-art');
		if(cart[articul]<5) {
			cart[articul]++;
		}else{
			alert('Товара больше нет в наличие!');
		}
		
		saveCartToLocalStorage();//sohraniu korxinu v local storage
		showCart();
		
	}

	function minusGoods(){
		var articul = $(this).attr('data-art');
		if(cart[articul]>1) {
			cart[articul]--;
		}
		else {
			delete cart[articul];
		}
		saveCartToLocalStorage();//sohraniu korxinu v local storage
		showCart();
	}

	function deleteGoods(){
		var articul = $(this).attr('data-art');//polucaiu articli tovara po kotoromu klicau
		delete cart[articul];
		saveCartToLocalStorage();//sohraniu korxinu v local storage
		showCart();
	}
	function summ(){
		/*var out ='';
		var summa_items=0;
		
		
		out=summa_items;
		$('.summ').html(out);*/
	}
});
	
function checkCart(){
  //proveriau nalicie korzini v local storage
  if (localStorage.getItem('cart')!= null) { //esli v localstorage cto to esti
    cart = JSON.parse(localStorage.getItem('cart'));//preobrazovivaiu znacenia v massiv 
  }
}

function saveCartToLocalStorage (){
	localStorage.setItem('cart',JSON.stringify(cart));
}

function isEmpty (object){ //proverka korzini na pustotu
	for (var key in object)
		if (object.hasOwnProperty(key)) return true;
		return false;
}

function sendEmail(){
	var ename = $('#ename').val();
	var email = $('#email').val();
	var ephone = $('#ephone').val();
	var eddress = $('#eaddress').val();
	if(ename!='' && email!='' && ephone!=''&& eaddress!=''){
		if(isEmpty(cart)){//esli korxina ne pusta
			//ajax zapros
			/*$.post(
				"core/mail.php",
				{
					"ename": ename,
					"email":email,
					"ephone":ephone,
					"cart":cart
				},
				function(data){
					console.log(data);
					}
				);
			}
			else{
			alert(' ');
			console.log('rabotaet*/		}
	}else{
		alert(' Заполните данные об оплате! ');
	}
}

$(document).ready(function(){
	$('.send-email').on('click',sendEmail); //otpraviti pisimo s zakazom
});

