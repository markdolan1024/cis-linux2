<?php
	// setcookie('foo', 'bar');
//	header("X-Sample-Test: foo");
//	var_dump(headers_list());
	$name ='http://www.sciencetap.us/assets/App/assets/Images/Observation/Image_43.jpg';
	$fp = fopen($name, 'rb'); 
	header('Content-Type: image/jpeg');
	header("Content-Length: " . filesize($name));
	readfile($fp);
	// fpassthru($fp);	
//	var_dump($name);
	// exit;
	
	function get_contents(){
		file_get_contents('http://www.sciencetap.us/assets/App/assets/Images/Observation/Image_43.jpg');
		var_dump($http_response_header);
	}
//	get_contents();
//	var_dump($http_response_header);
?>
