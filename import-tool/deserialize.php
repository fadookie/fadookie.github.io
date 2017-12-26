<?php
if (count($argv) !== 2) {
    echo "wrong number of arguments\n";
    exit(1);
}
$obj = unserialize($argv[1]);
echo json_encode($obj);

