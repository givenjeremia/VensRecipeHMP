<?php 
    header("Access-Control-Allow-Origin: *");
    $conn = new mysqli("localhost", "hybrid_160419118","ubaya","hybrid_160419118");
    $arr = [];
    extract($_POST);
    if(isset($_POST['cari'])) {
        $cari=$_POST['cari']; //atau GET
        $sql = "SELECT * FROM recipes WHERE nama_recipes like '%$cari%'";
    }else if(isset($_POST['recipes_id'])){
        $recipes_id = $_POST['recipes_id']; //atau GET
        $sql = "SELECT * FROM `recipes` WHERE `idrecipes` = $recipes_id";
    }
    else if(isset($_POST['category_id'])){
        $category_id= $_POST['category_id']; //atau GET
        $sql = "SELECT * FROM `recipes` WHERE `idcategory` = $category_id";
    }
    else if(isset($_POST['username_login'])){
        $username_login= $_POST['username_login']; //atau GET
        $sql = "SELECT * FROM `recipes` WHERE `username` = $username_login";
    }
    else {
        $sql = 'SELECT * FROM `recipes`';
    }
    
    $stmt = $conn->prepare($sql);
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