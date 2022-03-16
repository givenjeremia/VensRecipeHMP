<?php 
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost", "hybrid_160419118","ubaya","hybrid_160419118");
    extract($_POST);
    $arr = [];
    $sql = 'UPDATE `recipes` SET `idcategory`=?,`nama_recipes`=?,`description_recipe`=?,`bahan_bahan`=?,`cara_memasak`=? WHERE `idrecipes`=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('isssss',$id_category,$nama_recipes,$description_recipe,$bahan_bahan , $cara_memasak , $id_recipe );
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