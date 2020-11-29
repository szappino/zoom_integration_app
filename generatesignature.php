<?php

function generate_signature ( $api_key, $api_secret, $meeting_number, $role){

	$time = time() * 1000 - 30000;//time in milliseconds (or close enough)	
	$data = base64_encode($api_key . $meeting_number . $time . $role);	
	$hash = hash_hmac('sha256', $data, $api_secret, true);	
	$_sig = $api_key . "." . $meeting_number . "." . $time . "." . $role . "." . base64_encode($hash);	
	//return signature, url safe base64 encoded
	return rtrim(strtr(base64_encode($_sig), '+/', '-_'), '=');
}


header('content-Type: application/json');

$api_key='lpXCXucV4c3M6LiBF0IvtGht9LBsm3mpbz8n';
$api_secret='oNQG3fRvAEfIM3Qbv8uorH8IWMuXhKPeJja7';

echo json_encode(generate_signature($api_key, $api_secret, $GET['mID'], $GET['role']));