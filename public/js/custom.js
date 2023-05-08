$(document).ready(function() {
  $("#items").hide();
  // $("#itemModal").hide();
  $.ajax({
      type: "GET",
      url: "/api/customer/all",
      dataType: 'json',
      success: function (data) {
          // console.log(data);
          $.each(data, function(key, value) {
            // console.log(value);
            id = value.customer_id;
            var tr = $("<tr>");
            tr.append($("<td>").html(value.customer_id));
            tr.append($("<td>").html(value.title));
            tr.append($("<td>").html(value.lname));
            tr.append($("<td>").html(value.fname));
            tr.append($("<td>").html(value.addressline));
            tr.append($("<td>").html(value.phone));
            tr.append("<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#editModal' id='editbtn' data-id="+ id + "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></a></i></td>");
            tr.append("<td><a href='#'  class='deletebtn' data-id="+ id + "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i></td>");
            $("#cbody").append(tr);
          });
        },
        error: function(){
          console.log('AJAX load did not work');
          alert("error");
        }
      });// end #items

  $("#item").on('click', function(e) {
    e.preventDefault();
    $("#customers").hide("slow");
    $("#items").show();
    $.ajax({
      type: "GET",
      url: "/api/item",
      dataType: 'json',
      success: function (data) {
      // console.log(data);
      $.each(data, function(key, value) {
        console.log(value);
        id = value.item_id;
        var img = "<img src="+value.img_path +" width='200px', height='200px'/>";
        var tr = $("<tr>");
        tr.append($("<td>").html(value.item_id));
        tr.append($("<td>").html(img));
        tr.append($("<td>").html(value.description));
        tr.append($("<td>").html(value.cost_price));
        tr.append($("<td>").html(value.sell_price));
        tr.append("<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#itemModal' id='editbtn' data-id="+ id + "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></a></i></td>");
        tr.append("<td><a href='#'  class='deletebtn' data-id="+ id + "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i></td>");
        $("#ibody").append(tr);
     });
    },
    error: function(){
      console.log('AJAX load did not work');
      alert("error");
    }
  });
});//  end #item

  // $("#myFormSubmit").on('click', function(e) {
  //   e.preventDefault();
  //   var data = $("#cform").serialize();
  //   // console.log(data);
  //   $.ajax({
  //       type: "POST",
  //       url: "/api/customer",
  //       data: data,
  //       headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
  //       dataType: "json",
  //       success: function(data) {
  //           $("#myModal").modal("hide");
  //               var tr = $("<tr>");
  //               tr.append($("<td>").html(data.customer.customer_id));
  //               tr.append($("<td>").html(data.customer.title));
  //               tr.append($("<td>").html(data.customer.lname));
  //               tr.append($("<td>").html(data.customer.fname));
  //               tr.append($("<td>").html(data.customer.addressline));
  //               tr.append($("<td>").html(data.customer.phone));
  //               tr.append("<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#editModal' id='editbtn' data-id="+ data.customer.customer_id + "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></a></i></td>");
  //               tr.append("<td><a href='#'  class='deletebtn' data-id="+ data.customer.customer_id + "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i></td>");
  //               $('#ctable').prepend(tr.hide().fadeIn(5000));
  //             },
  //             error: function(error) {
  //               console.log('error');
  //             }
  //           });
  // });// end #myFormSubmit

  $("#myFormSubmit").on('click', function(e) {
    e.preventDefault();
    var data = $("#cform").serialize();
    console.log(data);
    $.ajax({
        type: "POST",
        url: "/api/customer",
        data: data,
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        dataType: "json",
        success: function(data) {
          console.log(data);
          $("#myModal").modal("hide");
            var $ctable = $('#ctable').DataTable();
            $ctable.row.add(data).draw();
               
        },
        error: function(error) {
            console.log('error');
        } 
    });
  });//  end #myFormSubmit1104
  $("#itemSubmit").on('click', function(e) {
    e.preventDefault();
    // var data = $("#iform");
    var data = $('#iform')[0];
    // console.log(data);
    let formData = new FormData($('#iform')[0]);
    // var data = $("#iform").serialize();
    // console.log(formData.entries());
    for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }
  $.ajax({
    type: "POST",
    url: "/api/item",
    data: formData,
    contentType: false,
    processData: false,
    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
    dataType: "json",
    success: function(data) {
      console.log(data.item.img_path);
      $("#itemModal").modal("hide");
      // var img = "<img src="+value.img_path +" width='200px', height='200px'/>";
      var img = "<img src="+data.item.img_path +" width='200px', height='200px'/>";
      var tr = $("<tr>");
      tr.append($("<td>").html(data.item.item_id));
      tr.append($("<td>").html(img));
      tr.append($("<td>").html(data.item.description));
      tr.append($("<td>").html(data.item.sell_price));
      tr.append($("<td>").html(data.item.cost_price));
      tr.append("<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#editModal' id='editbtn' data-id="+ data.item.item_id + "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></a></i></td>");
      tr.append("<td><a href='#'  class='deletebtn' data-id="+ data.item.item_id + "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i></td>");
      $('#itable').prepend(tr.hide().fadeIn(5000));
    },
    error: function(error) {
      console.log('error');
    }
  });
});//  end #itemSubmit

// $('#editModal').on('show.bs.modal', function(e) {
//     var id = $(e.relatedTarget).attr('data-id');
//     // console.log(id);
//     $('<input>').attr({type: 'hidden', id:'customerid',name: 'customer_id',value: id}).appendTo('#updateform');
//     $.ajax({
//         type: "GET",
//         url: "/api/customer/" + id + "/edit",
//         success: function(data){
//                // console.log(data);
//                $("#etitle").val(data.title);
//                $("#elname").val(data.lname);
//                $("#efname").val(data.fname);
//                $("#eaddress").val(data.addressline);
//                $("#etown").val(data.town);
//                $("#ezipcode").val(data.zipcode);
//                $("#ephone").val(data.phone);
//           },
//           error: function(){
//             console.log('AJAX load did not work');
//             alert("error");
//           }
//       });
// });//  end #editModal

$('#editModal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget).attr('data-id');
    console.log(id);
    $.ajax({
        type: "GET",
        url: "/api/customer/" + id + "/edit",
        success: function(data){
            $("#etitle").val(data.title);
               $("#elname").val(data.lname);
               $("#efname").val(data.fname);
               $("#eaddress").val(data.addressline);
               $("#etown").val(data.town);
               $("#ezipcode").val(data.zipcode);
               $("#ephone").val(data.phone);
          },
          error: function(){
          console.log('AJAX load did not work');
          alert("error");
          }
      });
});//   end #editModal1104

$('#editModal').on('hidden.bs.modal', function (e) {
  $("#updateform").trigger("reset");
  });

$('#editModal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget).attr('data-id');
    $("#updateform").trigger("reset");
    $("#customerid").val(id);
});//   end #editModal1104

// $("#updatebtn").on('click', function(e) {
//     // e.preventDefault();
//     // alert("test");
//     var id = $('#customerid').val();
//     var data = $("#updateform").serialize();
//     // console.log(data);
//     $.ajax({
//         type: "PATCH",
//         url: "/api/customer/"+ id,
//         data: data,
//         headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
//         dataType: "json",
//         success: function(data) {
//             console.log(data);
//             $('#editModal').each(function(){
//                     $(this).modal('hide'); 
//               });
//             $("tr td:contains("+id+")").remove();
//             // $tr.find('td').fadeOut(2000,function(){ 
//             //                   $tr.remove();  
//             //                 });
//             var tr = $("<tr>");
//             tr.append($("<td>").html(data.customer_id));
//             tr.append($("<td>").html(data.title));
//             tr.append($("<td>").html(data.lname));
//             tr.append($("<td>").html(data.fname));
//             tr.append($("<td>").html(data.addressline));
//             tr.append($("<td>").html(data.phone));
//             tr.append("<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#editModal' id='editbtn' data-id="+ data.customer_id + "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></a></i></td>");
//             tr.append("<td><a href='#'  class='deletebtn' data-id="+ data.customer_id + "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i></td>");
//             $('#ctable').prepend(tr.hide().fadeIn(5000));
//         },
//         error: function(error) {
//             console.log('error');
//         }
//     });
// });// end #updatebtn

/*error pa din nagdodoble*/
$("#updatebtn").on('click', function(e) {
    e.preventDefault();
    // console.log(e.relatedTarget);
    // var $row = $(e.relatedTarget).closest('tr');
    var customerId = $('#customerid').val();
    console.log(customerId);
    var table = $('#ctable').DataTable();
    var cRow = $("tr td:contains("+customerId+")").closest('tr');
    var data = $("#updateform").serialize();
    $.ajax({
            type: "PATCH",
            url: "/api/customer/"+ customerId,
            data: data,
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            dataType: "json",
            success: function(data) {
                console.log(data);
                $('#editModal').modal("hide");
                table.row(cRow).data(data).invalidate().draw(false);
            },
            error: function(error) {
                alert('error');
            }
    });
});//   end #updatebtn

// /*error sa pag-upadte, nagdodoble*/
// $("#updatebtn").on('click', function(e) {
//     e.preventDefault();
//     var customerId = $('#customerid').val();
//     console.log(customerId);
//     var table = $('#ctable').DataTable();
//     var cRow = $("tr td:contains("+customerId+")").closest('tr');
//     var data = $("#updateform").serialize();
//     $.ajax({
//         type: "PATCH",
//         url: "/api/customer/"+ customerId,
//         data: data,
//         headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
//         dataType: "json",
//         success: function(data) {
//             console.log(data);
//             $('#editModal').modal("hide");
//             table.row(cRow).data(data).invalidate().draw(false);
//          },
//         error: function(error) {
//             alert('error');
//         }
//     });
// });//   end #updatebtn1104

/*kay sir*/
// $('#ctable tbody').on( 'click', 'a.deletebtn', function (e) {
//     var table = $('#ctable').DataTable();
//     var id = $(this).data('id');
//     var $row = $(this).closest('tr');
//     console.log(id);
//     e.preventDefault();
//         bootbox.confirm({
//             message: "do you want to delete this customer",
//             buttons: {
//                 confirm: {
//                     label: 'yes',
//                     className: 'btn-success'
//                 },
//                 cancel: {
//                     label: 'no',
//                     className: 'btn-danger'
//                 }
//             },
//             callback: function (result) {
//                 console.log(result);
//                 if (result)
//                     $.ajax({type: "DELETE",
//                         url: "/api/customer/"+ id ,
//                         headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
//                         dataType: "json",
//                         success: function(data) {
//                             console.log(data);
//                             table.row( $row ).remove().draw(false);
//                             $row.fadeOut(4000, function () {
//                                table.row( $row ).remove().draw(false);
//                              });
//                             bootbox.alert(data.success);
//                         },
//                         error: function(error) {
//                             console.log(error);
//                         }
//                       });
//             }
//         });
//  });

// /*akin */
// $('#ctable').on( 'click', 'a.deletebtn', function (e) {
//     var table = $('#ctable').DataTable();
//     var id = $(this).data('id');
//     var $row = $(this).closest('tr');
//     console.log(id);
//     e.preventDefault();
//         bootbox.confirm({
//             message: "do you want to delete this customer",
//             buttons: {
//                 confirm: {
//                     label: 'yes',
//                     className: 'btn-success'
//                 },
//                 cancel: {
//                     label: 'no',
//                     className: 'btn-danger'
//                 }
//             },
//             callback: function (result) {
//                 console.log(result);
//                 if (result)
//                     $.ajax({type: "DELETE",
//                         url: "/api/customer/"+ id ,
//                         headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
//                         dataType: "json",
//                         success: function(data) {
//                             console.log(data);
//                             table.row( $row ).remove().draw(false);
//                             $row.fadeOut(4000, function () {
//                                table.row( $row ).remove().draw(false);
//                              });
//                             bootbox.alert(data.success);
//                         },
//                         error: function(error) {
//                             console.log(error);
//                         }
//                       });
//             }
//         });
//  });//  end #ctable

// akin nagdedelete na 
$('#ctable').on( 'click', 'a.deletebtn', function (e) {
    var table = $('#ctable').DataTable();
    var id = $(this).data('id');
    var $row = $(this).closest('tr');
    console.log(id);
    e.preventDefault();
        bootbox.confirm({
            message: "do you want to delete this customer",
            buttons: {
                confirm: {
                    label: 'yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'no',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                console.log(result);
                if (result)
                    $.ajax({
                        type: "DELETE",
                        url: "/api/customer/"+ id,
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        dataType: "json",
                        success: function(data) {
                            console.log(data);
                            table.row( $row ).remove().draw(false);
                             
                            bootbox.alert('success');  
                        },
                        error: function(error) {
                            console.log('error');
                        }
                    });
            }
        });
 });//  end #ctable

// $("#cbody").on('click',".deletebtn",function(e) {
//     var id = $(this).data('id');
//     var $tr = $(this).closest('tr');
//         // var id = $(e.relatedTarget).attr('id');
//     console.log(id);
//         e.preventDefault();
//         bootbox.confirm({
//             message: "Do you want to delete this customer",
//             buttons: {
//                 confirm: {
//                     label: 'Yes',
//                     className: 'btn-success'
//                 },
//                 cancel: {
//                     label: 'No',
//                     className: 'btn-danger'
//                 }
//             },
//             callback: function (result) {
//                 if (result)
//                     $.ajax({
//                         type: "DELETE",
//                         url: "/api/customer/"+ id,
//                         headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
//                         dataType: "json",
//                         success: function(data) {
//                             console.log(data);
//                             // bootbox.alert('success');
//                             $tr.find('td').fadeOut(2000,function(){ 
//                               $tr.remove();  
//                             });   
//                         },
//                         error: function(error) {
//                             console.log('error');
//                         }
//                         });
//             }
//         });
//     });// end #cbody

$("#ibody").on('click',".deletebtn",function(e) {
    var id = $(this).data('id');
    var $tr = $(this).closest('tr');
        // var id = $(e.relatedTarget).attr('id');
    console.log(id);
        e.preventDefault();
        bootbox.confirm({
            message: "Do you want to delete this customer",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result)
                    $.ajax({
                        type: "DELETE",
                        url: "/api/customer/"+ id,
                        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        dataType: "json",
                        success: function(data) {
                            console.log(data);
                            // bootbox.alert('success');
                            $tr.find('td').fadeOut(2000,function(){ 
                              $tr.remove();  
                            });   
                        },
                        error: function(error) {
                            console.log('error');
                        }
                        });
            }
        });
    });// end #ibody
$('#itemModal').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget).attr('data-id');
    // console.log(id);
    $('<input>').attr({type: 'hidden', id:'itemid',name: 'item_id',value: id}).appendTo('#iform');
    $.ajax({
        type: "GET",
        url: "/api/item/" + id + "/edit",
        success: function(data){
               // console.log(data);
               $("#desc").val(data.description);
               $("#sell").val(data.sell_price);
               $("#cost").val(data.cost_price);
               $("#image").val(data.img_path);
          },
         error: function(){
          console.log('AJAX load did not work');
          alert("error");
          }
      });
});//  end #itemModal

$("#itemSubmit").on('click', function(e) {
    // e.preventDefault();
    // alert("test");
    var id = $('#itemid').val();
    // var data = $("#updateform").serialize();
    var data = $('#iform')[0];
    // console.log(data);
    let formData = new FormData($('#iform')[0]);
    // console.log(data);
    $.ajax({
        type: "PUT",
        url: "/api/item/"+ id,
        data: formData,
        contentType: false,
        processData: false,
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        dataType: "json",
        success: function(data) {
            console.log(data);
            $('#itemModal').each(function(){
                    $(this).modal('hide'); 
              });
            $("tr td:contains("+id+")").remove();
            var img = "<img src="+data.img_path +" width='200px', height='200px'/>";
            var tr = $("<tr>");
            tr.append($("<td>").html(data.item_id));
            tr.append($("<td>").html(img));
            tr.append($("<td>").html(data.description));
            tr.append($("<td>").html(data.sell_price));
            tr.append($("<td>").html(data.cost_price));
            tr.append("<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#itemModal' id='editbtn' data-id="+ data.item_id + "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></a></i></td>");
            tr.append("<td><a href='#'  class='deletebtn' data-id="+ data.item_id + "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i></td>");
            $('#itable').prepend(tr.hide().fadeIn(5000));
        },
        error: function(error) {
            console.log('error');
        }
    });
});// end #itemSubmit

$( "#customer_search" ).autocomplete({
  // var data;
        source: function( request, response ) {
          // Fetch data
          // console.log(request);
          $.ajax({
            url:'/api/customer/search',
            type: 'post',
            dataType: "json",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: {search: request.term}, 
            success: function( data ) {
               response( data );
               console.log(data);
            }
        });
    },
    select: function (event, ui) {
        $('#customer_search').val(ui.item.label);
        $('#customer_id').val(ui.item.value);
        $.ajax({
            type: "GET",
            url: "/api/customer/"+ui.item.value,
            dataType: 'json',
            success: function (data) {
                console.log(data.customer_id);
                // $("#ctable > tbody").empty();
                $('#ctable').find('#cbody').detach();
                $('#ctable').append($('<tbody id=cbody>')); 
                    // $.each(data, function(key, value) {
                        // console.log(value);
                        id = data.customer_id
                        var tr = $("<tr>");
                        tr.append($("<td>").html(data.title));
                        tr.append($("<td>").html(data.lname));
                        tr.append($("<td>").html(data.fname));
                        tr.append($("<td>").html(data.addressline));
                        tr.append($("<td>").html(data.phone));
                        tr.append("<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#editModal' id='editbtn' data-id="+ id + "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></a></i></td>");
                        tr.append("<td><a href='#'  class='deletebtn' data-id="+ id + "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i></td>");
                        $("#cbody").append(tr);
             // });
            },
            error: function(){
                console.log('AJAX load did not work');
                alert("error");
            }
        });
    }//end select
});//   end #customer_search

$("#itemSearch").on('keyup', function(e) {
    var term = $("#itemSearch").val();
    $.ajax({
        type: "GET",
        url: "/api/item/search/"+term,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            // $("#ctable > tbody").empty();
            $('#itable').find('#ibody').detach();
            $('#itable').append($('<tbody id=ibody>')); 
            $.each(data, function(key, value) {
                console.log(value);
                var img = "<img src="+value.img_path +" width='200px', height='200px'/>";
                id = value.item_id;
                var tr = $("<tr>");
                tr.append($("<td>").html(value.item_id));
                tr.append($("<td>").html(img));
                tr.append($("<td>").html(value.description));
                tr.append($("<td>").html(value.sell_price));
                tr.append($("<td>").html(value.cost_price));
                tr.append("<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#editModal' id='editbtn' data-id="+ id + "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></a></i></td>");
                tr.append("<td><a href='#'  class='deletebtn' data-id="+ id + "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i></td>");
                $("#ibody").append(tr);
            });
        },
        error: function(){
          console.log('AJAX load did not work');
          alert("error");
      }
    });
  });//  end #itemSearch

$('#ctable').DataTable({
      // ajax:"/api/customer/all",
     ajax: {
     url :"/api/customer/all",
     dataSrc: "",
     },
     // select: true,
     dom: 'Bfrtip',
     buttons: [
                  {
                      text: 'Add customer',
                      className: 'btn btn-primary',
                      action: function ( e, dt, node, config ) {
                      // alert( 'Button activated' )
                      $("#cform").trigger("reset");
                      $('#myModal').modal('show');
                  }
              }
          ],
          columns: [
          { "data": "customer_id" },
          { "data": "title" },
          { "data": "lname" },
          { "data": "fname" },
          { "data": "addressline" },
          { "data": "phone" },
          { "data" : null,
          render : function ( data, type, row ) {
            return "<a href='#' data-bs-toggle='modal' data-bs-target='#editModal' id='editbtn' data-id="+ data.customer_id + 
            "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></i></a><a href='#'  class='deletebtn' data-id="+ data.customer_id + 
            "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i>";
        }
    }
    ],
    }); //  end #ctable
}); //end ready