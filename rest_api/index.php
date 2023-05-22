<?php

header('Content-type: application/json');

require('connect_to_DB.php');
require('./controllers/ProductsController.php');

$query = $_GET['query'];
$parameters = explode('/', $query);




