<?php
	// header('Content-Type: image/jpeg');
	// header('Content-Type: image/png');
	function LoadJpeg($imgname){
		$im =@imagecreatefromjpeg($imgname);
 		if(!$im){
			$im = imagecreatetruecolor(150,30);
			$bgc = imagecolorallocate($im, 255, 255, 255);
			$tc = imagecolorallocate($im, 0, 0, 0);
			imagefilledrectangle($im, 0, 0, 150, 30, $bgc);
			imagestring($im, 1, 5, 5, 'Error loading ' . $imgname, $tc);
		}
		return $im;
	}
	// $img = LoadJpeg('http://www.sciencetap.us/assets/App/assets/Images/Observation/Image_43.jpg');
	// imagejpeg($img);
	// imagedestroy($img);
	// vardump(gd_info());
	$imagename = 'http://www.sciencetap.us/assets/App/assets/Images/Observation/Image_43.jpg';
	$imageinfo = getimagesize($imagename);
	$fp = fopen($imagename, 'rb');
	if($imageinfo && $fp){
		header("Content-Type: {$imageinfo['mime']}");
		header('Content-Disposition: attachment; filename=' . basename($imagename));
		fpassthru($fp);
	}
	foreach($imageinfo as $name => $value){
		// $name = htmlspecialchars($name);
		// $value = htmlspecialchars($value);
		echo "$name : $value <br />\n";
	}
?>
