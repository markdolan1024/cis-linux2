<?php
	if(isset($_GET['img'])){
		$imagename = $_GET['img'];	
		$imageinfo = getimagesize($imagename);
		$fp = fopen($imagename, 'rb');
		if($imageinfo && $fp){
			header("Content-Type: {$imageinfo['mime']}");
			header('Content-Disposition: attachment; filename=' . basename($imagename));
			fpassthru($fp);
		}
	}else{
		echo '<p>No $_GET[img] variable set</p>';
	}
?>
