<?php

class ProductsController
{
    
    function getProducts($pdo){
        $data = array();
        $id = 0;
        $req = $pdo->prepare('SELECT * FROM products ');
        $req->execute();
        while ($response = $req->fetch()) {
            $data["$id"] = $response;
            $id++;
        }

        echo json_encode(['result' => $data]);

    }


    // function createProduct($pdo, $data)
    // {
    //     $req = $pdo->prepare("INSERT INTO products ('id', 'name', 'category_id', 'parent', 'price', 'longtitle', 'description', 'alias', 'published', 'content', 'image') VALUES (NULL, '', '', '0', '', '', '', '', '0', NULL, '0', NULL, '')");



    // }

    function deleteProduct()
    {
    }

    function changeProduct()
    {
    }
}
