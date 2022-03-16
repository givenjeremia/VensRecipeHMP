<?php 
    header("Access-Control-Allow-Origin: *");
    $arr = [];
    $conn = new mysqli("localhost", "hybrid_160419118","ubaya","hybrid_160419118");
    if($conn->connect_error) {
        $arr= ["result"=>"error","message"=>"unable to connect"];
    }
    extract($_POST);
    $sql = 'SELECT * FROM users WHERE username=? AND password=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss',$username,$password);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result-> num_rows >0){
        $data = $result->fetch_assoc();
        $arr = ['result'=>'success' , 'data'=>$data];
    }
    else{
        $arr = ['result'=>'fail' , 'message '=>$conn->error];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
