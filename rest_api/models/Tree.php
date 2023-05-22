<?php
declare(strict_types = 1);

require('Node.php');

class Tree {

    public Node $root;

    public function __construct(Node $root)
    {
        $this->root = $root;
    }

    public function DFS(Node $tree, int $id):void {

    }
}
