<?php 
  $host = 'localhost';
  $username = "root";
  $password = "";
  $port = 3306;
  $dbname = "week7";

  /* Attempt MySQL server connection. Assuming you are running MySQL
  server with default setting (user 'root' with no password) */
  $mysqli = new mysqli($host, $username, $password, $dbname, $port);
  // Check connection
  if($mysqli === false){
      die("ERROR: Could not connect. " . $mysqli->connect_error);
  }

  $json = file_get_contents('php://input');
  // decoding the received JSON and store into $obj variable.
  $userData = json_decode($json,true);

  function validate(){
    //TODO
    return true;
  }

  function sanitize($userData){
    //TODO
    return $userData;
  }

  $userData = sanitize();
  $valid = validate($userData);

  if($valid){
    /* TODO : instead of checking against hard coded values, query the database for an existing user */
    if($userData['username'] === 'frodo' && $userData['password'] === 'baggins'){
      echo "user " . $userData["username"] . " just signed in";
    }
    else{
      echo "could not find";
    }
  }
  else{
    echo "invalid";
  }
?>