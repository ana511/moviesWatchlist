<?php
  $json = file_get_contents('php://input');
  // decoding the received JSON and store into $obj variable.
  $movie = json_decode($json,true);

  $firstParse = fopen("movies.json", "r") or die("Unable to open file!");
  $contents = fread($firstParse,filesize("movies.json"));

  $movies = json_decode($contents);
  array_push($movies->watchlist, $movie);

  fclose($firstParse);

  $myfile = fopen("movies.json", "w") or die("Unable to open file!");
  fwrite($myfile, json_encode($movies));
  fclose($myfile);

  echo json_encode("movie bookmarked successfully");
?>