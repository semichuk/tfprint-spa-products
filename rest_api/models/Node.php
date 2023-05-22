<?php
declare(strict_types = 1);

class Node {

    public array $child_node;
    public int $id;
    public string $name;
    public int $parent_category_id;

    function __construct(array $child_node, int $id, string $name, int $parent_category_id)
    {
        $this->child_node = $child_node;
        $this->id = $id;
        $this->name = $name;
        $this->parent_category_id = $parent_category_id;

    }
    
    
    
    
}



?>


