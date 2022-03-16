<?php  
    header("Access-Control-Allow-Origin: *");
    extract($_POST);
    $new_image_name = $_POST['id'].".jpg";
    move_uploaded_file($_FILES["photos"]["tmp_name"],"image/recipe/".$new_image_name);
	/* $_POST[”id"] adalah data yang dikirim bersamaan dengan file gambar */
?>
