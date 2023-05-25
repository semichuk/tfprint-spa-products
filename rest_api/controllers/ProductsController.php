<?php

class ProductsController
{
    
    function getProducts($pdo){
        $req = $pdo->prepare('SELECT * FROM products ');
        $req->execute();
        while ($response = $req->fetch()) {
            echo (json_encode($response));
        }
    }

    function createProduct()
    {
    }

    function deleteProduct()
    {
    }

    function changeProduct()
    {
    }
}
