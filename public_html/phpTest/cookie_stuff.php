<?php
	setcookie("MyCookie[foo]", 'Testing1', time()+3600);
	setcookie("MyCookie[bar]", 'Testing2', time()+3600);
	setcookie('testCookie', 'Testing2', time()+3600);
?>
<?php
	if(isset($_COOKIE['count'])){
		$count = $_COOKIE['count'] +1;
	}else{
		$count = 1;
	}
	setcookie('count', $count, time()+3600);
	setcookie("Cart[$count]", $item, time()+3600);
?>
<?php
	ob_start();
	$output = $_COOKIE['testCookie'];
	echo "Hello\n";
	echo $count;
	echo $output; 
	setcookie("MyCookie[bar]", 'set before ob_end_flush', time() + 3600);
	print_r($_COOKIE);
	setcookie("testCookie", "", time() - 3600);
	if(isset($_COOKIE['MyCookie'])){
		foreach($_COOKIE['MyCookie'] as $name => $value){
			$name = htmlspecialchars($name);
			$value = htmlspecialchars($value);
			echo "$name : $value <br />\n";
		}
	}
	ob_end_flush();
?>
