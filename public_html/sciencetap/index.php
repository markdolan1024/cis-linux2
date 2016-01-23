<?php
	function redirect_to($new_location) {
	  header("Location: " . $new_location);
	  exit;
	}
	redirect_to("www/index.html");

?>
