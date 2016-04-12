<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Controller Class : Cuserparti
 * 
 * Created on Friday. Aug 13. 2014
 *
 * @Author       : Woodie
 * @E-mail       : 304471139@qq.com
 * @Version      : 1.0
 * @UpdateLog    : None
 * @Description  : This Class is used to control whether or not users get into the system.0
 *                 It contains about Login and Registration features.
 * @RelatedView  : view_item_info.php at /views/mobile_app/
 * @RelatedModel : Model_User / Model_Manager / Model_Item
 * @RelatedLib   : None
 */

class Cuserparti extends CI_Controller 
{
	/*************
	 * Constructor
	 */
	function __construct()
	{
		parent::__construct();
		// load in model( Model_user )
		$this->load->model("Model_User");
		// load in model( Model_Item )
		$this->load->model("Model_Item_");
		// load in model( Model_Manager )
		$this->load->model("Model_Manager");
	}
	
	/******************
	 * Default Action :
	 * Print welcome message ..
	 */
	public function index()
	{
		$this->load->view('welcome_message');
	}
	
	/******************************************
	 * Action : GetItemInfo
	 * To get the current item info from server 
	 */
	public function GetItemInfo()
	{
		// Obtain the user id 
		$user_id  = $this->input->post('user_id');
		// First we need get the item id from user 
		$item_id  = $this->Model_User->GetItemId($user_id);
		// If there is no item that the user has participated
		if($item_id == "0")
		{
			$Current_Item_Status = array(
				"status"    => "1",
				"item_info" => "You have no QueueItem!"
			);
		}
		else
		{
			// Second, we can get all info of item by item id 
			$obj_item = $this->Model_Item_->GetItemInfo($item_id);
			// info about sequence
			$seq = $this->Model_Item_->QueueSeq($item_id);
			// info about manager
			$manager_id  = $obj_item->manager_id;
			$obj_manager = $this->Model_Manager->ManagerID2GetManagerInfo($manager_id);
			// Finally, we pack these info up.
			$item_info = array(
				"item_id"          => $item_id,
				"item_name"        => $obj_item->item_name,
				"item_type"        => $obj_item->item_type,
				"status"           => $obj_item->status,
				"parti_time"       => $obj_item->parti_time,
				"seq"              => $seq,
				"manager_name"     => $obj_manager->manager_name,
				"total_one2two"    => $obj_manager->total_one2two,
				"total_three2four" => $obj_manager->total_three2four,
				"total_upfive"     => $obj_manager->total_upfive,
				"left_one2two"     => $obj_manager->left_one2two,
				"left_three2four"  => $obj_manager->left_three2four,
				"left_upfive"      => $obj_manager->left_upfive,
				"notification"     => $obj_item->notification
			);
			$Current_Item_Status = array(
				"status"    => "0",
				"item_info" => $item_info
			);
		}
		// return login info 
		$this->load->view('mobile_app/view_item_info',$Current_Item_Status);
	}
	
	/*******************************************
	 * Action : SearchManagerInfo
	 * Via barcode to search the info of manager 
	 */
	public function GetManagerInfo($type)
	{
		// Use barcode to get manager info
		if($type == 0)
		{
			// Obtain the info of barcode
			$barcode_info = $this->input->post('barcode_info');
			// Get the manager info via barcode
			$obj_manager  = $this->Model_Manager->Barcode2GetManagerInfo($barcode_info);
		}
		else if($type == 1)
		{
			// Obtain the info of barcode
			$manager_id = $this->input->post('manager_id');
			// Get the manager info via barcode
			$obj_manager  = $this->Model_Manager->ManagerID2GetManagerInfo($manager_id);
		}
		if($obj_manager == "null")
		{
			$Current_Manager_Status = array(
				"status"       => "1",
				"manager_info" => "It's not a valid manager!"
			);
		}
		else
		{
			// We pack up these info.
			$manager_info = array(
				"manager_name"     => $obj_manager->manager_name,
				"manager_id"       => $obj_manager->manager_id,
				"introduction"     => $obj_manager->introduction,
				"total_one2two"    => $obj_manager->total_one2two,
				"total_three2four" => $obj_manager->total_three2four,
				"total_upfive"     => $obj_manager->total_upfive,
				"left_one2two"     => $obj_manager->left_one2two,
				"left_three2four"  => $obj_manager->left_three2four,
				"left_upfive"      => $obj_manager->left_upfive
			);
			$Current_Manager_Status = array(
				"status"       => "0",
				"manager_info" => $manager_info
			);
		}
		// return login info 
		$this->load->view('mobile_app/view_manager_info',$Current_Manager_Status);
	}
	
	/**************************************
	 * Action : PartiEnsure
	 * User ensure to participate the queue
	 */
	public function Participate()
	{
		// Obtain the info of a new item 
		$user_id    = $this->input->post('user_id');
		$manager_id = $this->input->post('manager_id');
		$item_type  = $this->input->post('item_type');
		// Dose the user have a active item ? 
		$item_id    = $this->Model_Item_->IsExistActiveItem($user_id);
		if($item_id != "null")
		{
			// It's exist, and cancel it. 
			//$this->Model_Item_->CancelItem($item_id);
			$data = array("status" => "1");
			$this->Model_Item_->updateItemInfo($item_id,$data);
		}
		// Create a new active item
		$item_id = $this->Model_Item_->CreateItem($user_id,$manager_id,$item_type);
		if($item_id != "failed")
		{
			// Update the info in user sheet
			$data = array("item_id" => $item_id);
			$this->Model_User->updateUserInfo($user_id,$data);
			// Pack up !
			$Create_Item_Status = array(
				"status"  => "0",
				"item_id" => $item_id
			);
		}
		else
		{
			$Create_Item_Status = array(
				"status"  => "1",
				"item_id" => $item_id
			);
		}
		// return parti info 
		$this->load->view('mobile_app/view_parti_info',$Create_Item_Status);
	}
	
	/************************
	 * Action : PartiCancel
	 * User cancel  the queue
	 */
	public function Cancel()
	{
		// Obtain the info of user id 
		$user_id    = $this->input->post('user_id');
		$item_id    = $this->input->post('item_id');
		$state      = $this->input->post('state');
		// revise the item status
		$data = array("status"  => $state);
		$this->Model_Item_->updateItemInfo($item_id,$data);
		$data = array("item_id" => "0");
		$this->Model_User->updateUserInfo($user_id,$data);
		// Pack up!
		$Cancel_Status = array(
			"status" => "0",
			"msg"    => "Cancel Successfully!"
		);
		// return parti info 
		$this->load->view('mobile_app/view_cancel_info',$Cancel_Status);
	}
	
	/************************************
	 * Action : CurrentSeq
	 * Return the user's current sequence
	 */
	public function GetUserId()
	{
		//echo "hahah!";		
		// Obtain the info of item id 
		$user_name = $this->input->post('user_name');
		// revise the item status
		$user_id = $this->Model_User->GetUserId($user_name);
		$register_info = array(
			'status'  => '0',
			'msg'     => $user_id
		);
		// return parti info 
		$this->load->view('mobile_app/welcome_result',$register_info);
	}
	
	/*******************************************
	 * Action : ClearNotification
	 * via item id to get the item info
	 */
	public function ClearNotification()
	{
		// Obtain the info of item
		$item_id = $this->input->post('item_id');
		// Notification!
		$data = array("notification" => 0);
		$this->Model_Item_->updateItemInfo($item_id,$data);
		// Pack up!
		$response_msg = array(
			"status" => "0",
			"msg"	 => "Notificate is clear!"
		);
		$this->load->view('mobile_app/welcome_result',$response_msg);
	}
}
?>
