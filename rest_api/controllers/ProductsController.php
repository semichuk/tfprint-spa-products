<?php

class ProductsController
{

    function getProducts($pdo)
    {
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

    function changeProduct($pdo, $data, $id)
    {
        if ((int)$data['id'] === (int)$id) {
            $req = $pdo->prepare("UPDATE `products` SET `name`=:name, `price`=:price, `image`=:image, `longtitle`=:longtitle,`description`=:description,`published`=:published,`content`=:content WHERE id=:id");
            $req->execute($data);

            http_response_code(200);
            $response = [
                "result" => true,
                "message" => "product id={$data['id']} successfully updated",
                "request_id" => $id,
                "product_id"=>$data['id']
            ];
            echo json_encode($response);
        } else {
            http_response_code(400);
            $response = [
                "result" => false,
                "message" => "product id={$data['id']} not updated",
                "request_id" => $id,
                "product_id"=>$data['id']
            ];
            echo json_encode($response);
        }
    }
}
