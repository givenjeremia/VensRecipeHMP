<?php 
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost", "hybrid_160419118","ubaya","hybrid_160419118");
    $arr = [];
    if(isset($_POST['category_id'])) {
        $category_id =$_POST['category_id']; //atau GET
        $sql = "SELECT * FROM `category` WHERE idcategory= $category_id";
    }
    else {
        $sql = 'SELECT * FROM `category`';
    }
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $categories =[];
    if($result-> num_rows >0){
        while($r2 = mysqli_fetch_assoc($result))
        {
            array_push($categories,$r2);
        }
        $arr = ['result'=>'success' , 'data'=>$categories];
    }
    else{
        $arr = ['result'=>'fail' , 'message '=>$conn->error];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close(); 
?>

