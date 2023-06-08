<?php

class ProductsController
{

    function getProducts($pdo)
    {
        $data = [];

            ///////////////get other values/////////////
            $request = $pdo->prepare('SELECT * FROM products');
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
        echo json_encode(['result' => $data]);
    }


    function createProduct($pdo, $data)
    {
        try {
            $req = $pdo->prepare("INSERT INTO products ( pagetitle, parent, price, longtitle, description, alias, published, content, image) 
                                            VALUES ( :name, :parent, :price, :longtitle, :description, :alias, :published, :content, :image)");
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
            try {
                

                $pdo->beginTransaction();

                $req = $pdo->prepare("UPDATE products SET pagetitle =:name, alias=:alias, longtitle=:longtitle, description=:description, published=:published, content=:content WHERE id=:id");
                $req->execute([
                    "name"=>$data['name'],
                    "alias"=>$data['alias'],
                    "longtitle"=>$data['longtitle'],
                    "description"=>$data['description'],
                    "published"=>$data['published'],
                    "content"=>$data['content'],
                    "id"=>$data['id'],
                ]);
                $req = $pdo->prepare("UPDATE tfprint_site_tmplvar_contentvalues SET value =:price WHERE tmplvarid = :tmplvarid_price AND contentid = :contentid");
                $req->execute([
                    "price" => $data['price'],
                    "tmplvarid_price" => 1,
                    "contentid"=>$data['id']
                ]);
                $req = $pdo->prepare("UPDATE tfprint_site_tmplvar_contentvalues SET value =:image WHERE tmplvarid = :tmplvarid_image  AND contentid = :contentid");
                $req->execute([
                    "image" => $data['image'],
                    "tmplvarid_image" => 2,
                    "contentid"=>$data['id']

                ]);

                $pdo->commit();

                http_response_code(200);
                $response = [
                    "result" => true,
                    "message" => "product id={$data['id']} successfully updated",
                    "request_id" => $id,
                    "product_id" => $data['id']
                ];
                echo json_encode($response);

            } catch (Exception $e) {
                $pdo->rollback();
                http_response_code(400);
                $response = [
                    "result" => false,
                    "message" => $e->getMessage()
                ];
                echo json_encode($response);
            }
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
