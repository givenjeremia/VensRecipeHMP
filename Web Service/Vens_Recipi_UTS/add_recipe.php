<?php 
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost", "hybrid_160419118","ubaya","hybrid_160419118");
    extract($_POST);
    $arr = [];
    $sql = 'INSERT INTO `recipes`(`username`, `idcategory`, `nama_recipes`, `description_recipe`, `bahan_bahan`, `cara_memasak`) VALUES (?,?,?,?,?,?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sissss',$username,$id_category,$nama_recipes,$description_recipe,$bahan_bahan , $cara_memasak );
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