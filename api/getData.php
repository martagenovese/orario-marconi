<?php

//error_reporting(E_ALL);
//ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET");

require_once 'database.php';

$db = databaseConnection();
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $query;
    $data = array();

    if($_GET['prof'])
        $query = "SELECT * FROM ore WHERE prof = '".$_GET['prof']."'";
    elseif ($_GET['classe'])
        $query = "SELECT * FROM ore WHERE classe = '".$_GET['classe']."'";
    elseif ($_GET['aula'])
        $query = "SELECT * FROM ore WHERE aula = '".$_GET['aula']."'";
    elseif ($_GET['all'])
        $query = "SELECT DISTINCT " . $_GET['all'] . " FROM ore";
    else{
        http_response_code(400);
        $error = [
            "status" => "error",
            "message" => "no parameters"
        ];
        echo json_encode($error);
        $db->close();
        exit();
    }

    $result = $db->query($query);

    
    
    
    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }

    echo json_encode($data);

    $db->close();
}

?>