<?php
$Current_Queue_info = array(
	"status"          => $status,
	"timestamps"      => $timestamps,
	"obj_item_one2two"    => $obj_item_one2two,
	"obj_item_three2four" => $obj_item_three2four,
	"obj_item_upfive"     => $obj_item_upfive
	);
echo json_encode($Current_Queue_info);
?>