<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Model Class : Model_Manager 
 * 
 * Created on Tuesday. Aug 12. 2014
 *
 * @Author       : Woodie
 * @E-mail       : 304471139@qq.com
 * @Version      : 1.1
 * @UpdateLog    : Add some new operation .at 14.8.13
 * @Description  : This Class illustrate the manager system's related operation
 *                 include followed operations:
 *                 1.Add a new manager (addManager)
 *                 2.Check manager's login info (checkManager)
 *                 3.Check the manager's name is exist (checkUnique)
 *                 4.Via manager id to get the corresponding manager's info (ManagerID2GetManagerInfo)
 *                 5.Via barcode to get the corresponding manager's info (Barcode2GetManagerInfo)
 * @RelatedDBS   : manager
 * @DB_Attribute : manager_id   varchar 20 (Primary Key)
 *                 manager_name varchar 30 
 *                 password     varchar 20
 *                 barcode_info varchar 50
 *                 introduction varchar 500
 *                 total_one2two    int
 *                 total_three2four int
 *                 total_upfive     int
 *                 left_one2two     int
 *                 left_three2four  int
 *                 left_upfive      int
 */

class Model_Manager extends CI_Model
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
	 * It is used to register a new manager..
	 */
	function addManager($manager_name,$password,$introduction)
	{
		$manager_id = 'm' . date("YmdHis") . '_' . rand(1000, 9999);
		$data = array(
				"manager_id"      => $manager_id,
				"manager_name"    => $manager_name,
				"password"        => $password,
				"introduction"    => $introduction,
				"barcode_info"    => "0"
 				);
		$this->db->insert("manager",$data);
	}
	
	/*****************************************************************
	 * Database Operation : Check that manager_name and pwd is matched
	 */
	function checkManager($manager_name,$password)
	{
		// Encapsulating query .. 
		$sql = "SELECT * FROM manager WHERE manager_name = ? AND password = ?"; 
		$query = $this->db->query($sql, array($manager_name,$password));
		if($query->num_rows() <= 0)
		{
			return FALSE;
		}
		else
		{
			return TRUE;
		}
	}
	
	/********************************************************
	 * Database Operation : Check that manager_name is unique
	 */
	function checkUnique($manager_name)
	{
		// Encapsulating query .. 
		$sql = "SELECT * FROM manager WHERE manager_name = ?"; 
		$query = $this->db->query($sql, array($manager_name));
		if($query->num_rows() <= 0)
		{
			return TRUE;
		}
		else
		{
			return FALSE;
		}
	}
	
	/****************************************
	 * Database Operation :Get the manager id
	 */
	function GetManagerId($manager_name)
	{
		// Encapsulating query .. 
		$sql = "SELECT manager_id FROM manager WHERE manager_name = ?"; 
		$query = $this->db->query($sql, array($manager_name));
		if($query->num_rows() > 0)
		{
			foreach ($query->result() as $row)
			{
				return $row->manager_id;
			}
		}
		else
		{
			return "null";
		}
	}
	
	/*****************************************************************************
	 * Database Operation : Via manager id to get the corresponding manager's info
	 */
	function ManagerID2GetManagerInfo($manager_id)
	{
		// Encapsulating query .. 
		$sql = "SELECT * FROM manager WHERE manager_id = ?"; 
		$query = $this->db->query($sql, array($manager_id));
		if($query->num_rows() > 0)
		{
			foreach ($query->result() as $row)
			{
				return $row;//it's a obj, we use "->" to read it's member value
			}
		}
		else
		{
			return "null";
		}
	}
	
	/**************************************************************************
	 * Database Operation : Via barcode to get the corresponding manager's info
	 */
	function Barcode2GetManagerInfo($barcode_info)
	{
		// Encapsulating query .. 
		$sql = "SELECT * FROM manager WHERE barcode_info = ?"; 
		$query = $this->db->query($sql, array($barcode_info));
		if($query->num_rows() > 0)
		{
			foreach ($query->result() as $row)
			{
				return $row;//it's a obj, we use "->" to read it's member value
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
	function updateManagerInfo($manager_id,$data)
	{
		// ALERT! 
		// HERE THE USERNAME CANNOT USE CHINESE ,
		// IT WILL LEAD TO DATA UPDATE FAILED.
		
		// Certain the user need to update
		$where = "manager_id = " . "'" . $manager_id . "'";
		// update ..
		$this->db->update('manager', $data, $where);
	}
}
?>

