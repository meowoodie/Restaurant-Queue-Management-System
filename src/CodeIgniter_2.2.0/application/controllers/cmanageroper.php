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

class Cmanageroper extends CI_Controller 
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
				"left_upfive"      => $obj_manager->left_upfive
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
	public function GetManagerInfo()
	{
		// Obtain the info of manager id
		$manager_id = $this->input->post('manager_id');
		// Get the manager info via id
		$obj_manager  = $this->Model_Manager->ManagerID2GetManagerInfo($manager_id);

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
				"barcode_info"     => $obj_manager->barcode_info,
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
	
	/*******************************************
	 * Action : UpdateBarcodeInfo
	 * Tell Server to update the barcode info 
	 */
	public function UpdateBarcodeInfo()
	{
		// Obtain the info of manager id and name
		$manager_id   = $this->input->post('manager_id');
		$manager_name = $this->input->post('manager_name');
		// Generate a new barcode info
		$new_barcode_info = date("YmdHis") . '_' . $manager_name . '_' .rand(10000, 99999);
		// Revise the barcode info in database
		$data = array("barcode_info" => $new_barcode_info);
		$this->Model_Manager->updateManagerInfo($manager_id,$data);
		// Pack up!
		$Current_Barcode_Info = array(
			"status"       => "0",
			"barcode_info" => $new_barcode_info
		);
		// return barcode info 
		$this->load->view('mobile_app/view_barcode_info',$Current_Barcode_Info);
	}
	
	/*******************************************
	 * Action : PostItemInfo
	 * It used to post new item info to mobile
	 */
	public function PostItemInfo()
	{
		// Obtain the info of manager id and name
		$manager_id   = $this->input->post('manager_id');
		// Generate the Item info 
		$current_time = date("Y-m-d H:i:s");
		$obj_item_one2two    = $this->Model_Item_->GetItemViaManager($manager_id,"1");
		$obj_item_three2four = $this->Model_Item_->GetItemViaManager($manager_id,"2");
		$obj_item_upfive     = $this->Model_Item_->GetItemViaManager($manager_id,"3");
		// Pack up!
		$Current_Queue_Info  = array(
			"status"          => "0",
			"timestamps"      => $current_time,
			"obj_item_one2two"    => $obj_item_one2two, 
			"obj_item_three2four" => $obj_item_three2four, 
			"obj_item_upfive"     => $obj_item_upfive
		);
		// return item info
		$this->load->view('mobile_app/view_queue_info',$Current_Queue_Info);
	}

	/*******************************************
	 * Action : ChangeItemStatus
	 * Revise the item's status which is chosen
	 */
	public function ChangeItemStatus()
	{
		// Obtain the info of item
		$item_id = $this->input->post('item_id');
		//$user_id = $this->input->post('user_id');
		$status  = $this->input->post('status');
		$user_id = $this->Model_Item_->GetUserId($item_id);
		// Revise the status of item in database
		$data = array("status" => $status);
		$this->Model_Item_->updateItemInfo($item_id,$data);
		$data = array("item_id" => "0");
		$this->Model_User->updateUserInfo($user_id,$data);	
		// Pack up!
		$response_msg = array(
			"status" => "0",
			"msg"	 => "Change Successfully! Status : " .  $status	
		);
		$this->load->view('mobile_app/welcome_result',$response_msg);
	}
	
	//--------------------------------
	// Haven't finished!
	//--------------------------------
	public function PostUserAlert()
	{
		// Obtain the info of item
		$item_id = $this->input->post('item_id');
		$user_id = $this->Model_Item_->GetUserId($item_id);
	}
	
	/*******************************************
	 * Action : LookUserInfo
	 * Check the corresponding user info
	 */
	public function LookUserInfo()
	{
		// Obtain the info of item
		$item_id = $this->input->post('item_id');
		$user_id = $this->Model_Item_->GetUserId($item_id);
		$user_info = $this->Model_User->GetUserInfo($user_id);
		//Pack up!
		$The_User_Info = array(
			"status"     => "0",
			"user_info"	 => $user_info
		);
		$this->load->view('mobile_app/view_user_info',$The_User_Info);
	}
	
	/*******************************************
	 * Action : GetItemInfo
	 * via item id to get the item info
	 */
	public function GetItemNameViaID()
	{
		// Obtain the info of item
		$item_id = $this->input->post('item_id');
		$obj_item = $this->Model_Item_->GetItemInfo($item_id);
		// Pack up!
		$Current_Item_Status = array(
				"status"    => "0",
				"item_info" => $obj_item->item_name
		);
		// return login info 
		$this->load->view('mobile_app/view_item_info',$Current_Item_Status);
	}
	
	/*******************************************
	 * Action : Notification
	 * via item id to get the item info
	 */
	public function Notification()
	{
		// Obtain the info of item
		$item_id = $this->input->post('item_id');
		$no_type = $this->input->post('no_type');
		// Notification!
		$data = array("notification" => $no_type);
		$this->Model_Item_->updateItemInfo($item_id,$data);
		// Pack up!
		$response_msg = array(
			"status" => "0",
			"msg"	 => "Notificate the item successfully!"
		);
		$this->load->view('mobile_app/welcome_result',$response_msg);
	}
	
	/*******************************************
	 * Action : ModifyTableCount
	 * via item id to get the item info
	 */
	public function ModifyTableCount()
	{
		// Obtain the info of item
		$manager_id  = $this->input->post('manager_id');
		$table_type  = $this->input->post('table_type');
		$table_count = $this->input->post('table_count');
		// Modify the count of the table
		$data = array($table_type => $table_count);
		$this->Model_Manager->updateManagerInfo($manager_id,$data);
		// Pack up!
		$response_msg = array(
			"status" => "0",
			"msg"	 => "Modify the count successfully!"
		);
		$this->load->view('mobile_app/welcome_result',$response_msg);
	}
	
	/*******************************************
	 * Action : DropOldData
	 * via item id to get the item info
	 */
	public function DropOldData()
	{
		// Obtain the info of item
		$manager_id  = $this->input->post('manager_id');
		// Modify the count of the table
		$data = array("status" => "4");
		$this->Model_Item_->updateItemInfoViaManager($manager_id,$data);
		// Pack up!
		$response_msg = array(
			"status" => "0",
			"msg"	 => "Drop data successfully!"
		);
		$this->load->view('mobile_app/welcome_result',$response_msg);
	}
}
?>
