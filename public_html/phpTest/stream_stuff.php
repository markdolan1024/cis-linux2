<?php
	$file = fopen('http://www.sciencetap.us/assets/App/assets/Images/Observation/Image_43.jpg', 'rb');
	$name = basename($file);
	$writefile = fopen($name, 'w');
	if(!writefile){
		echo "<p>Unable to write file</p>";
		exit;
	}
	if(!file){
		echo "<p>Unable to open remote file.</p>");
		exit;
	}
	while(!feof($file)){
		$line = fgets($file, 1024);
		fwrite($writefile, $line);
	}
	fclose($file);
	fclose($writefile);
	// imagejpeg($fp);
	// echo stream_get_contents($fp);
?>
