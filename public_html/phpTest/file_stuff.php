<?php
	$file =fopen('http://www.sciencetap.us/assets/App/assets/Images/Observation/Image_43.jpg', 'rb');
	$newfile = 'example.jpg';
	if(file_exists($file)){
		header('Content-Description: File Transfer');
		header('Content-Type: image/jpeg');
		header('Content-Disposition: attachment; filename=' . basename($file));
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' .filesize($file));
		readfile($file);
		// $im =@imagecreatefromjpeg($file);
		 // imagejpeg($im);
		exit;
	}else{
		vardump(headers_list());
	}
	if(!copy($file, $newfile)){
		echo "failed to copy $file...\n";
	}
	echo basename($file);
?>
