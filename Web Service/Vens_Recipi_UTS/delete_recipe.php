<?php 
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost", "hybrid_160419118","ubaya","hybrid_160419118");
    extract($_POST);
    $arr = [];
    $sql = 'DELETE FROM `recipes` WHERE `idrecipes` =?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i',$recipe_id);
    $stmt->execute();
    if($stmt->affected_rows >0){
        $arr = ['result'=>'success'];
    }
    else{
        $arr = ['result'=>'fail' , 'error'=>$conn->error];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
?>