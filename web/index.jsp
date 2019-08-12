<%--
  Created by IntelliJ IDEA.
  User: alicanozer
  Date: 2019-08-11
  Time: 16:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>w3w6-Blog</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="resources/js/blog.js"></script>
    <link rel="stylesheet" type="text/css" href="resources/css/blog.css">
  </head>
  <body>
  <p>User ID: <input id='userid' type='text' name='userid'  /></p>
  <p><input id='getButton' type='button' value='Get'  />
    <input id='getAllButton' type='button' value='Get All'  />
  </p>
  <br/><br/>
  <div id="info"></div>
  <div id="user"></div>
  <div id="posts"></div>

  </body>
</html>
