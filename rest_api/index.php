<?php

require('connect_to_DB.php');
require('./controllers/ProductsController.php');

header('Content-type: application/json');

$controller = new ProductsController();
$request = $_GET['query'];

if($request === 'products') {
    $controller->getProducts($pdo);
}



