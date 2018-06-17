jQuery(function($){
   $("#ephone").mask("+(373) 99999999");
});


var cart = {}; //massiv moia korzina 



$('document').ready(function(){
  loadGoods(); //áóäåò çàãðóæàòü òîâàðû íà ñòðàíèöó
  //loadGoodsMens(); //áóäåò çàãðóæàòü òîâàðû íà ñòðàíèöó
  checkCart();//proveriau nalicie korzini
  //showMiniCart();//pokazivaiu soderjimoe korzini
});


function loadGoods(){ 
  //çàãðóæàþ òîâàðû íà ñòðàíèöó
  $.getJSON("goods.json", function (data){
    //console.log(data);
    var out = ''; //obiavleam pustuiu stroku
    for (var key in data) { 
      out += '<div class = "single-goods">';
      //v key article polucim dostup k obiectu 123 
      out += '<img src="'+data[key].image+'">';
      out += '<h3>' + data[key]['name']+'</h3>';
      //v paragrafe vivodim name tovara
      out += '<h4>' + data[key]['cost']+' лей</h4>';    
     // out += 'Öâåò: <h4>'+'<img src="'+ data[key]['images'] +'" width="20">'+'</h4>';
      out += '<button class="add-to-cart" data-art="'+key+'"> + Добавить в корзину </button>'; //kajdomu articlu svoi button
      out += '</div>';
    }

    $('#goods').html(out); //zapisivaem resultat vnutri goods
    $('button.add-to-cart').on('click',addToCart);//po clicku vipolniaem addtocart
  });
}

function addToCart(){
  //dobabliaem tovari v korzinu
  var articul = $(this).attr('data-art');//citaiu articl konkrtetno eta knopka
  if (cart[articul]!=undefined) { //esli tovar uje v korzine to uvelicivem kol-vo
    cart[articul]++;
  } else {
      cart[articul ] = 1;//v massiv dobavliau zapisi s kol-vom
  }
  localStorage.setItem('cart',JSON.stringify(cart)); //sohr dannie korzini v localstorage
  console.log(cart);

}

function checkCart(){
  //proveriau nalicie korzini v local storage
  if (localStorage.getItem('cart')!= null) { //esli v localstorage cto to esti
    cart = JSON.parse(localStorage.getItem('cart'));//preobrazovivaiu znacenia v massiv 
  }
}


//https://www.youtube.com/watch?v=J8Bo8DhX05o&t=922s
//https://ruseller.com/lessons.php?rub=36&id=634
//w3.org.ua

  



