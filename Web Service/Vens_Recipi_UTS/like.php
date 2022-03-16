<?php 
    header("Access-Control-Allow-Origin: *");
    $arr = [];
    $conn = new mysqli("localhost", "hybrid_160419118","ubaya","hybrid_160419118");
    if($conn->connect_error) {
        $arr= ["result"=>"error","message"=>"unable to connect"];
    }
    extract($_POST);

    //Ambil Count
    
    if($_POST['likes']){
        $count += 1;
        $sql1 = "INSERT INTO `likes`(`username`, `idrecipes`, `count`) VALUES (?,?,?)";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->bind_param('sii',$username,$idrecipes,$count);
        $stmt1->execute();

    }
    else if($_POST['unlikes']){
        $sql1 = "UPDATE `likes` SET `count`=0  WHERE `username` = ? AND`idrecipes` = ?";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->bind_param('si',$username_del,$idrecipes_del);
        $stmt1->execute();
        if($stmt1->affected_rows>0){
            $arr = ['result'=>'success'];
        }
        else{
            $arr = ['result'=>'fail' , 'message '=>$conn->error];
        }
    }
    else if($_POST['cek']){
        $sql = "SELECT SUM(count) as Total , (SELECT count FROM `likes` WHERE `idrecipes` = ? AND `username` = ?) AS LIKES FROM `likes` WHERE `idrecipes` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('isi',$idrecipes,$username,$idrecipes);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $data = [];
        if($row > 0){
            array_push($data,$row);
            $arr = ['result'=>'success' , 'count'=>$data];
        }
        else{
            $arr = ['result'=>'fail' , 'count'=>['Total'=>0,'LIKES'=>0]];
        }
    }
    
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
