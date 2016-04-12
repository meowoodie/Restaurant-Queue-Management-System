<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Model Class : Model_Item 
 * 
 * Created on Wednesday. Aug 13. 2014
 *
 * @Author       : Woodie
 * @E-mail       : 304471139@qq.com
 * @Version      : 1.0
 * @UpdateLog    : none
 * @Description  : This Class illustrate the custom system's related operation
 *                 include followed operations:
 * @RelatedDBS   : item
 * @DB_Attribute : item_id    varchar 20 (Primary Key)
 *                 item_name  varchar 30 
 *                 item_type  int
 *                 parti_time timestamp
 *                 status     int
 *                 user_id    varchar 20
 *                 manager_id varchar 20
 */

class Model_Item_ extends CI_Model
{
	/*************
	 * Constructor
	 */
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	
	
	/**********************************************************
	 * Database Operation : Check the item_id is exist or not
	 */
	function IsExistActiveItem($user_id)
	{
		// Encapsulating query .. 
		$sql = "SELECT item_id FROM item_ WHERE user_id = ? AND status = 0"; 
		$query = $this->db->query($sql, array($user_id));
		if($query->num_rows() > 0)
		{
			foreach ($query->result() as $row)
			{
				return $row->item_id;
			}
		}
		else
		{
			return "null";
		}
	}
	
	/**********************************************************
	 * Database Operation : Check the item_name is exist or not
	 */
	function CheckItemName($item_name)
	{
		// Encapsulating query .. 
		$sql = "SELECT * FROM item_ WHERE item_name = ? AND status = 0"; 
		$query = $this->db->query($sql, array($item_name));
		if($query->num_rows() <= 0)
		{
			return TRUE;
		}
		else
		{
			return FALSE;
		}
	}
	
	/*************************************
	 * Database Operation : Insert a tuple
	 * It is used to register a new user..
	 */
	function CreateItem($user_id,$manager_id,$item_type)
	{
		// Generate the item_id
		$item_id = 'i' . date("YmdHis") . '_' . rand(1000, 9999);
		// Generate the item_name
		do
		{
			$item_name = rand(1000, 9999);
			// debug
			//echo "item name : " . $item_name;
		}
		// If there is a same item_name in database, we regenerate it again
		while(!$this->CheckItemName($item_name));
		// Generate the participate time (current timestamp) 
		$parti_time = date("YmdHis");
		// Pack up !
		$data = array(
				"item_id"    => $item_id,
				"item_name"  => $item_name,
				"manager_id" => $manager_id,
				"user_id"    => $user_id,
				"item_type"  => $item_type,
				"parti_time" => $parti_time,
				"status"     => "0"
 				);
		$this->db->insert("item_",$data);
		return $item_id;
	}
	
	/**********************************************************
	 * Database Operation : Cancel a item that is active
	 */
	//function DeleteItem($item_id)
	//{
	//	$this->db->delete("item_", array('item_id' => $item_id)); 
	//}
	
	/**************************************
	 * Database Operation : Get item's info
	 */
	function GetItemInfo($item_id)
	{
		// Encapsulating query .. 
		$sql = "SELECT * FROM item_ WHERE item_id = ?"; 
		$query = $this->db->query($sql, array($item_id));
		if($query->num_rows() > 0)
		{
			foreach ($query->result() as $row)
			{
				return $row;
			}
		}
		else
		{
			return "null";
		}
	}
	
	
	/*********************************************
	 * Database Operation : Update data in a tuple
	 */
	function updateItemInfo($item_id,$data)
	{
		// ALERT! 
		// HERE THE USERNAME CANNOT USE CHINESE ,
		// IT WILL LEAD TO DATA UPDATE FAILED.
		
		// Certain the user need to update
		$where = "item_id = " . "'" . $item_id . "'";
		// update ..
		$this->db->update('item_', $data, $where);
	}
	
	/*********************************************
	 * Database Operation : Update data in a tuple
	 */
	function updateItemInfoViaManager($manager_id,$data)
	{
		// ALERT! 
		// HERE THE USERNAME CANNOT USE CHINESE ,
		// IT WILL LEAD TO DATA UPDATE FAILED.
		
		// Certain the user need to update
		$where = "manager_id = " . "'" . $manager_id . "'";
		// update ..
		$this->db->update('item_', $data, $where);
	}
	
	/***********************************************
	 * Database Operation : Get the user current seq
	 */
	function QueueSeq($item_id)
	{
		// Find the item's participate time.		
		$item_info  = $this->GetItemInfo($item_id);
		$parti_time = $item_info->parti_time;
		$manager_id = $item_info->manager_id;
		// Revise !!!!
		$item_type  = $item_info->item_type;
		// Then find the num of items before this time 
		// Encapsulating query .. 
		$sql = "SELECT * FROM item_ WHERE parti_time <= ? AND manager_id = ? AND item_type = ? AND status = 0"; 
		$query = $this->db->query($sql, array($parti_time,$manager_id,$item_type));
		return $query->num_rows();
	}
	
	// return a array , not like before thar return a obj
	function GetItemViaManager($manager_id,$item_type)
	{
		$info  = array();
		$count = 0; 
		// Encapsulating query ..  .
		$sql = "SELECT * FROM item_ WHERE manager_id = ? AND item_type = ? AND status <> 4"; 
		$query = $this->db->query($sql, array($manager_id,$item_type));
		if($query->num_rows() > 0)
		{
			foreach ($query->result() as $row)
			{
				$item_info = array(
					"item_id"     => $row->item_id ,
					"item_name"   => $row->item_name ,
					"item_status" => $row->status ,
					"parti_time"  => $row->parti_time ,
					"user_id"     => $row->user_id
				);
				$info[$count] = $item_info;
				$count += 1;
				//return $row;
			}
			$info["num"] = "" . $query->num_rows();
			return $info;
		}
		else
		{
			return "null";
		}
	}
	
	/**************************************
	 * Database Operation : Get user's info
	 */
	function GetUserId($item_id)
	{
		// Encapsulating query .. 
		$sql = "SELECT * FROM item_ WHERE item_id = ?"; 
		$query = $this->db->query($sql, array($item_id));
		if($query->num_rows() > 0)
		{
			foreach ($query->result() as $row)
			{
				return $row->user_id;
			}
		}
		else
		{
			return "null";
		}
	}
}
?>

