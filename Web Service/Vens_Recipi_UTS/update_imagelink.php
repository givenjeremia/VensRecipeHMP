<?php 
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost", "hybrid_160419118","ubaya","hybrid_160419118");
    extract($_POST);
    $arr = [];
    $sql = 'UPDATE `recipes` SET `image_link`=? WHERE `idrecipes`=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si',$image_link,$id_recipe );
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