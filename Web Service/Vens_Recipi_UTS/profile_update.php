<?php 
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost", "hybrid_160419118","ubaya","hybrid_160419118");
    extract($_POST);
    $arr = [];
    $sql = 'UPDATE `users` SET `password`=?,`nama`=?,`tanggal_lahir`=? WHERE username=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssss',$password,$nama,$tanggal_lahir,$username );
    $stmt->execute();
    if($stmt->affected_rows >0){
        $arr = ['result'=>'success' , 'id'=>$conn->insert_id];
    }
    else{
        $arr = ['result'=>'fail' , 'error'=>$conn->error];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
?>