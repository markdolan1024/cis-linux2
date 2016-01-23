<?php
	$server =  '';
	// FA15_4331_tue79412
	$link = mssql_connect($server, 'tue79412', 'aiCheey9');
	if(!link){
		die(Something went wrong while connecting to MSSQL');
	}
?>
