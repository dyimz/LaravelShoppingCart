$(document).ready(function() {
   $.ajax({
    type: "GET",
    url: "/api/item",
    dataType: 'json',
    success: function (data) {
     console.log(data);
$.each(data, function(key, value) {
      // console.log(key);
      id = value.item_id;
      var item = "<div class='item'><div class='itemDetails'><div class='itemImage'><img src="+value.img_path +" width='200px', height='200px'/></div><div class='itemText'><p class='price-container'>Price: Php <span class='price'>"+ value.sell_price+ "</span></p><p>"+value.description+"</p></div><input type='number' class='qty' name='quantity' min='1' max='5'><p class='itemId'>"+ value.item_id+"</p></div><button type='button' class='btn btn-primary add' >Add to cart</button></div>";
   $("#items").append(item);
     });
    // $("#items").append("<a class='pagination__next' href="+ data.next_page_url+">Next</a>")
  },
    error: function(){
      console.log('AJAX load did not work');
      alert("error");
  }
  });
$("#items").on('click', '.add', function () {
 // $('.add').click(function (){
   itemCount ++;
$('#itemCount').text(itemCount).css('display', 'block');
clone =  $(this).siblings().clone().appendTo('#cartItems')
     .append('<button class="removeItem">Remove Item</button>');
var price = parseInt($(this).siblings().find('.price').text()); 
   priceTotal += price;
   $('#cartTotal').text("Total: €" + priceTotal);
 }); 
 $('.openCloseCart').click(function(){
   $('#shoppingCart').toggle();
});
$('#shoppingCart').on('click', '.removeItem', function(){
   $(this).parent().remove();  
   itemCount --;
   $('#itemCount').text(itemCount);
var price = parseInt($(this).siblings().find('.price').text());
   priceTotal -= price;
   $('#cartTotal').text("Total: php" + priceTotal);
   if (itemCount == 0) {
     $('#itemCount').css('display', 'none');
   }
 });
$('#emptyCart').click(function() {
   itemCount = 0;
   priceTotal = 0;
   $('#itemCount').css('display', 'none');
   $('#cartItems').text('');
   $('#cartTotal').text("Total: €" + priceTotal);
 }); 
$('#checkout').click(function() {
   itemCount = 0;
   priceTotal = 0;
   let itemid = 0;
 let qty = 0;
   let items = new Array();
$("#cartItems").find(".itemDetails").each(function(i,element) {
let itemid = 0;
 let qty = 0;
qty = parseInt($(element).find($(".qty")).val());
   itemid = parseInt($(element).find($(".itemId")).html());
   // console.log(qty, itemid);
    items.push({
    "item_id":itemid,
    "quantity": qty
    });
});
   console.log(JSON.stringify(items));
   var data = JSON.stringify(items);
   // console.log(items);
   $.ajax({
        type: "POST",
        url: "/api/item/checkout",
        data: data,
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        dataType: "json",
        processData: false,
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
          console.log(data);
            alert(data.status);
                },
        error: function(error) {
            console.log('error');
        }
    });
   $('#itemCount').css('display', 'none');
   $('#cartItems').text('');
   $('#cartTotal').text("Total: €" + priceTotal);
   // console.log(clone.find(".itemDetails"));
 });
});
