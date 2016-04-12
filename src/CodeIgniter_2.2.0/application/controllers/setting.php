<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Controller Class : Setting
 * 
 * Created on Friday. July 25. 2014
 *
 * @Author       : Woodie
 * @E-mail       : 304471139@qq.com
 * @Version      : 1.0
 * @UpdateLog    : None
 * @Description  : This Class is used to control whether or not users get into the system.0
 *                 It contains about Login and Registration features.
 * @RelatedView  : WelcomeResult.php at /views/mobile_app/
 * @RelatedModel : Model_User.php 
 * @RelatedLib   : None
 */

class Setting extends CI_Controller 
{
	
	/*************
	 * Constructor
	 */
	function __construct()
	{
		parent::__construct();
		// load in model
		$this->load->model("Model_User");
		//$this->load->model("Model_Participate");
		$para = array('domain' => 'uploadicon');
		$this->load->library('MyFile',// Loading in my customed class
							 $para// Storage Service's Domain
							 );
		//$this->username = $usr;
	}
	
	/*********************
	 * Action : UploadIcon
	 * Call it to upload user's new icon, and update the icon in the MySQL
	 */
	public function UploadIcon()
	{
		// Get the action's owner(username)
		$username = $this->input->post('username');	
		// Find original icon's name in MySQL
		$iconname = $this->Model_User->Icon($username);
		// Delete the original image in SAEStorage
		if(!$this->myfile->DeleteFile($iconname))
		{
			// echo first upload icon info..
		}
		// PostKey
		$postkey = 'icon';
		// Upload Icon image to the Storage, and
		// Get the image's key(filename) in Storage..
		$result = $this->myfile->UploadFile($postkey);
		// Store the filename in the MySQL
		// Edit the data need to update..
		$data = array(
			$postkey => $result['filename']
		);
		// Update..
		$this->Model_User->updateUserInfo($username,$data);
		// return uploadicon result
		$upload_info = array(
			'status'   => '0',
			'iconname' => $result['filename'],
			'msg'      => 'Upload icon image successfully!'
		);
                $this->load->view('mobile_app/view_uploadicon',$upload_info);
	}
	
	/***********************
	 * Action : DownloadIcon
	 * 
	 */
	public function DownloadIcon()
	{
	
	}
	
    /*************************
	 * Action : LoadUserInfo
	 * Made by Liu
	 */
	public function LoadUserInfo()
	{
        
        
        $status = $this->Model_User->GetUserInfo("Dosau");
        if($status)
        {
            $load_info = array(
                'status' => '0',
                'msg'    => 'load user info successfully!'
                );
        }
        else 
        {
            $load_info = array(
                'status' => '1',
                'msg'    => 'load user info error!'
                );
        }
        $this->load->view('mobile_app/view_loadinfo',$load_info);
	}
    
	/*************************
	 * Action : ReviseUserInfo
	 * 
	 */
	public function ReviseUserInfo()
	{
		$username    = $this->input->post('username');
		$phone       = $this->input->post('phone');
		$email       = $this->input->post('email');
		$brief_intro = $this->input->post('brief_intro');
		$data = array(
			'phone'       => $phone,
			'email'       => $email,
			'brief_intro' => $brief_intro
		);
		$this->Model_User->updateUserInfo($username,$data);
		$revise_info = array(
                        'status'   => '0',
                        'msg'      => 'Revise user info successfully!'
                );
                $this->load->view('mobile_app/view_reviseinfo',$revise_info);

	}
	
	/************************
	 * Action : LaunchedActiv
	 * 
	 */
	public function LaunchedActi()
	{
		
	}
	
	/****************************
	 * Action : ParticipatedActiv
	 * 
	 */
	public function ParticipatedActiv()
	{
		
	}
	
}
?>
