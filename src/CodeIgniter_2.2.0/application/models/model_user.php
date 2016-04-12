<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Model Class : Model_User 
 * 
 * Created on Friday. July 25. 2014
 *
 * @Author       : Woodie
 * @E-mail       : 304471139@qq.com
 * @Version      : 1.1
 * @UpdateLog    : Add some new operations .at 2014.8.13
 * @Description  : This Class illustrate the custom system's related operation
 *                 include followed operations:
 *                 1.Add a new user (addUser)
 *                 2.Check user's login info (checkUser)
 *                 3.Check the user's name is exist (checkUnique)
 *                 4.Get the user id (GetUserId)
 *                 5.Collect the user's item id (GetItemId)
 * @RelatedDBS   : user
 * @DB_Attribute : user_id   varchar 20 (Primary Key)
 *                 user_name varchar 30 
 *                 password  varchar 20
 *                 item_id   varchar 20
 *                 phone     varchar 20
 */

class Model_User extends CI_Model
{
	/*************
	 * Constructor
	 */
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	
	/*************************************
	 * Database Operation : Insert a tuple
	 * It is used to register a new user..
	 */
	function addUser($username,$password,$phone)
	{
		$user_id = 'u' . date("YmdHis") . '_' . rand(1000, 9999);
		$data = array(
				"user_id"    => $user_id,
				"user_name"   => $username,
				"password"   => $password,
				"phone"      => $phone,
				"item_id"    => "0"
 				);
		$this->db->insert("user",$data);
		return $user_id;
	}
	
	/************************************************************
	 * Database Operation : Check that usr_name and pwd is matched
	 */
	function checkUser($user_name,$password)
	{
		// Encapsulating query .. 
		$sql = "SELECT * FROM user WHERE user_name = ? AND password = ?"; 
		$query = $this->db->query($sql, array($user_name,$password));
		if($query->num_rows() <= 0)
		{
			return FALSE;
		}
		else
		{
			return TRUE;
		}
	}
	
	/***************************************************
	 * Database Operation : Check that usrname is unique
	 */
	function checkUnique($user_name)
	{
		// Encapsulating query .. 
		$sql = "SELECT * FROM user WHERE user_name = ?"; 
		$query = $this->db->query($sql, array($user_name));
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
	 * Database Operation :Get the user id
	 */
	function GetUserId($user_name)
	{
		// Encapsulating query .. 
		$sql = "SELECT user_id FROM user WHERE user_name = ?"; 
		$query = $this->db->query($sql, array($user_name));
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
	
	/*************************************************
	 * Database Operation : Collect the user's item id
	 */
	function GetItemId($user_id)
	{
		// Encapsulating query .. 
		$sql = "SELECT item_id FROM user WHERE user_id = ?"; 
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
	
	/*********************************************
	 * Database Operation : Update data in a tuple
	 */
	function updateUserInfo($user_id,$data)
	{
		// ALERT! 
		// HERE THE USERNAME CANNOT USE CHINESE ,
		// IT WILL LEAD TO DATA UPDATE FAILED.
		
		// Certain the user need to update
		$where = "user_id = " . "'" . $user_id . "'";
		// update ..
		$this->db->update('user', $data, $where);
	}
	
	/**************************************
	 * Database Operation : Get user's info
	 */
	function GetUserInfo($user_id)
	{
		// Encapsulating query .. 
		$sql = "SELECT * FROM user WHERE user_id = ?"; 
		$query = $this->db->query($sql, array($user_id));
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
}
?>

