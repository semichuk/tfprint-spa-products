<?php

class CategoriesController {
    function create_category(string $name, int $parent_category){

    }

    function change_category(string $name){

    }

    function delete_category(int $id){

    }

    function getCategories($pdo){
        $data = array();
        $id = 0;
        $req = $pdo->prepare('SELECT * FROM product_categories ');
        $req->execute();
        while ($response = $req->fetch()) {
            $data["$id"] = $response;
            $id++;
        }

        echo json_encode(['result' => $data]);
    }
}