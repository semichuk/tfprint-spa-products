<?php

require('connect_to_DB.php');
require('./controllers/ProductsController.php');
require('./controllers/CategoriesController.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PATCH,DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$controller = new ProductsController();
$query = $_GET['query'];
$parameters = explode('/', $query);
$type = $parameters[0];
$id = $parameters[1];

if ($method === 'GET') {
    if ($type === 'products') {
        $controller = new ProductsController();
        $controller->getProducts($pdo);
    } else if ($type === 'categories') {
        $controller = new CategoriesController();
        $controller->getCategories($pdo);
    }
}

if ($method === 'PATCH') {
    if ($type === 'products') {
        if (isset($id)){
            $data = json_decode(file_get_contents('php://input'), true);
            $controller = new ProductsController();
            $controller->changeProduct($pdo, $data, $id);
        }
        
    }
}
if ($method === 'POST'){
    if ($type === 'products') {

            $data = json_decode(file_get_contents('php://input'), true);
            $controller = new ProductsController();
            $controller->createProduct($pdo, $data);

            
    }
}
