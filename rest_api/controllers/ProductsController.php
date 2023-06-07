<?php

class ProductsController
{

    function getProducts($pdo)
    {
        $data = [];

        $Categoryes = [24, 25, 48, 53, 39, 197, 202, 205, 206];
        foreach ($Categoryes as $category) {
            ///////////////get other values/////////////
            $request = $pdo->prepare('SELECT * FROM tfprint_site_content WHERE parent = :parent  AND is_product = 1');
            $request->execute([
                'parent' => $category
            ]);
            while ($response = $request->fetch()) {
                $array = [
                    "id" => $response['id'],
                    "name" => $response['pagetitle'],
                    "published" => $response['published'],
                    "description" => $response['description'],
                    "longtitle" => $response['longtitle'],
                    "alias" => $response['alias'],
                    "content" => $response['content'],
                    "parent" => $category
                ];
                $id = $response['id'];
                ////////////////get price/////////////
                $req = $pdo->prepare('SELECT value FROM tfprint_site_tmplvar_contentvalues WHERE contentid = :contentid AND tmplvarid = :tmplvarid');
                $req->execute([
                    'contentid' => $id,
                    'tmplvarid' => 1
                ]);
                $res = $req->fetch();
                $price = $res['value'];
                ////////////////get image////////////
                $req = $pdo->prepare('SELECT value FROM tfprint_site_tmplvar_contentvalues WHERE contentid = :contentid AND tmplvarid = :tmplvarid');
                $req->execute([
                    'contentid' => $id,
                    'tmplvarid' => 2
                ]);
                $resImg = $req->fetch();
                $image = $resImg['value'];

                $array['price'] = $price;
                $array['image'] = $image;
                $data[] = $array;

            }



        }

        echo json_encode(['result' => $data]);
        // $data = array();
        // $id = 0;
        // $req = $pdo->prepare('SELECT * FROM products ');
        // $req->execute();
        // while ($response = $req->fetch()) {
        //     $data["$id"] = $response;
        //     $id++;
        // }

        // echo json_encode(['result' => $data]);
    }


    function createProduct($pdo, $data)
    {
        try {
            $req = $pdo->prepare("INSERT INTO products ( name, parent, price, longtitle, description, alias, published, content, image) 
                                            VALUES ( :name, :parent, :price, :longtitle, :description, :alias, :published, :content, :image)");


            // foreach ($data as $key => $value) {
            //     $req->bindValue($key , $value);
            // }
            $req->execute($data);

            http_response_code(201);
            $id = -1;
            $id = $pdo->lastInsertId();
            $response = [
                "result" => true,
                "message" => "product id={$id} name={$data['name']} successfully created"
            ];
            echo json_encode($response);
        } catch (Exception $th) {
            http_response_code(500);
            $response = [
                "result" => false,
                "message" => "product not created",
                "error" => $th
            ];
            echo json_encode($response);
        }
    }

    function deleteProduct($pdo, $data, $id)
    {
        if ((int)$data['id'] === (int)$id) {
            $req = $pdo->prepare("DELETE FROM `products` WHERE id=:id");
            $req->execute($data);

            http_response_code(200);
            $response = [
                "result" => true,
                "message" => "product id={$data['id']} successfully deleted",
                "request_id" => $id,
                "product_id" => $data['id']
            ];
            echo json_encode($response);
        } else {
            http_response_code(400);
            $response = [
                "result" => false,
                "message" => "product id={$data['id']} not deleted",
                "request_id" => $id,
                "product_id" => $data['id']
            ];
            echo json_encode($response);
        }
    }

    function changeProduct($pdo, $data, $id)
    {
        if ((int)$data['id'] === (int)$id) {
            $req = $pdo->prepare("UPDATE `products` SET `name`=:name, `price`=:price, `alias`=:alias, `image`=:image, `longtitle`=:longtitle,`description`=:description,`published`=:published,`content`=:content WHERE id=:id");
            $req->execute($data);

            http_response_code(200);
            $response = [
                "result" => true,
                "message" => "product id={$data['id']} successfully updated",
                "request_id" => $id,
                "product_id" => $data['id']
            ];
            echo json_encode($response);
        } else {
            http_response_code(400);
            $response = [
                "result" => false,
                "message" => "product id={$data['id']} not updated",
                "request_id" => $id,
                "product_id" => $data['id']
            ];
            echo json_encode($response);
        }
    }
}
