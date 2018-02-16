<?php
if (count($argv) !== 2) {
    echo "wrong number of arguments\n";
    exit(1);
}
$obj = unserialize(base64_decode($argv[1]));
echo json_encode($obj);

