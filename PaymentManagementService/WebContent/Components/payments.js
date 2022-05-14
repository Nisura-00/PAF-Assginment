$(document).on("click", "#btnSave", function(event)
{ 
// Clear alerts---------------------
 $("#alertSuccess").text(""); 
 $("#alertSuccess").hide(); 
 $("#alertError").text(""); 
 $("#alertError").hide(); 
// Form validation-------------------
var status = validatePaymentForm(); 
if (status != true) 
 { 
 $("#alertError").text(status); 
 $("#alertError").show(); 
 return; 
 } 
// If valid------------------------
var type = ($("#hidPaymentIDSave").val() == "") ? "POST" : "PUT"; 
 $.ajax( 
 { 
 url : "PaymentAPI", 
 type : type, 
 data : $("#formPayment").serialize(), 
 dataType : "text", 
 complete : function(response, status) 
 { 
 onPaymentSaveComplete(response.responseText, status); 
 } 
 }); 
});

function onPaymentSaveComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully saved."); 
 $("#alertSuccess").show(); 
 $("#divPaymentsGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while saving."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while saving.."); 
 $("#alertError").show(); 
 }
$("#hidPaymentIDSave").val(""); 
$("#formPayment")[0].reset(); 
}

//UPDATE==========================================
  $(document).on("click", ".btnUpdate", function(event)
		{ 
	    
		$("#hidPaymentIDSave").val($(this).data("paymentid")); 
		 $("#billID").val($(this).closest("tr").find('td:eq(0)').text()); 
		 $("#cardHolder").val($(this).closest("tr").find('td:eq(1)').text()); 
		 $("#cardNo").val($(this).closest("tr").find('td:eq(2)').text()); 
	     $("#cvv").val($(this).closest("tr").find('td:eq(3)').text()); 
	     $("#amount").val($(this).closest("tr").find('td:eq(4)').text()); 
		});




$(document).on("click", ".btnRemove", function(event)
		{ 
		 $.ajax( 
		 { 
		 url : "PaymentAPI", 
		 type : "DELETE", 
		 data : "paymentID=" + $(this).data("paymentid"),
		 dataType : "text", 
		 complete : function(response, status) 
		 { 
		 onPaymentDeleteComplete(response.responseText, status); 
		 } 
		 }); 
		});
		
function onPaymentDeleteComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully deleted."); 
 location.reload ();  
 
 $("#alertSuccess").show(); 
 $("#divPaymentsGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while deleting."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while deleting.."); 
 $("#alertError").show(); 
 } 
}





// CLIENT-MODEL================================================================
function validatePaymentForm()
{
	// Bill ID
	if ($("#billID").val().trim() == "")
	{
	return "Insert Bill ID.";
	}
	
	// Card Holder
	if ($("#cardHolder").val().trim() == "")
	{
	return "Insert card Holder.";
	}
	// Card No
	if ($("#cardNo").val().trim() == "")
	{
	return "Insert Card No.";
    }


    // CVV-----------------------
    if ($("#cvv").val().trim() == ""){
	
	return "Insert CVV.";
    }
    
    //PRICE-------------------------------
    if ($("#amount").val().trim() == ""){
	return "Insert Amount.";
    }
		// is numerical value
		var tmpPrice = $("#amount").val().trim();
		if (!$.isNumeric(tmpPrice))
	{
	return "Insert a numerical value for Item Price.";
	}
		
    // convert to decimal price
    $("#amount").val(parseFloat(tmpPrice).toFixed(2));

	return true;
}