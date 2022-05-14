<%@page import="com.Payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payments Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.js"></script>
<script src="Components/payments.js"></script>
</head>
<body> 
<div class="container"><div class="row"><div class="col-7"> 
<h1>Payments Management </h1>
<form id="formPayment" name="formPayment" method="post" action="payment.jsp">
 Bill ID: 
 <input id="billID" name="billID" type="text" 
 class="form-control form-control-sm">
 <br> Card Holder's Name: 
 <input id="cardHolder" name="cardHolder" type="text" 
 class="form-control form-control-sm">
 <br> Card Number: 
 <input id="cardNo" name="cardNo" type="text" 
 class="form-control form-control-sm">
 <br> CVV: 
 <input id="cvv" name="cvv" type="text" 
 class="form-control form-control-sm">
 <br> Amount:
 <input id="amount" name="amount" type="text" 
 class="form-control form-control-sm">
 <br>
 <input id="btnSave" name="btnSave" type="button" value="Save" 
 class="btn btn-primary">
 <input type="hidden" id="hidPaymentIDSave" 
 name="hidPaymentIDSave" value="">
</form>
<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>
<br>
<div id="divPaymentsGrid">
 <%
 Payment paymentObj = new Payment(); 
 out.print(paymentObj.readPayments()); 
 
 %>
</div>
</div> </div> </div> 
</body>
</html>
