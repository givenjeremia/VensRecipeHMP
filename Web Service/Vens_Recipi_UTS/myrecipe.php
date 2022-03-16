<?php 
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost", "hybrid_160419118","ubaya","hybrid_160419118");
    $arr = [];
    extract($_POST);

    $sql = "SELECT * FROM `recipes` WHERE `username` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$username_pk);
    $stmt->execute();
    $result = $stmt->get_result();
    $recipe =[];
    if($result-> num_rows >0){
        while($r2 = mysqli_fetch_assoc($result))
        {
            array_push($recipe,$r2);
        }
        $arr = ['result'=>'success' , 'data'=>$recipe];
    }
    else{
        $arr = ['result'=>'fail' , 'message '=>$conn->error];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close(); 
?>