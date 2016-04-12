<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Controller Class : Cmanagerlogin 
 * 
 * Created on Friday. Aug 12. 2014
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

class Cmanagerlogin extends CI_Controller 
{
	/*************
	 * Constructor
	 */
	function __construct()
	{
		parent::__construct();
		// load in model( Model_user )
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
	
	/*******************
	 * Action : Register
	 * New user registration 
	 */
	public function Register()
	{
		// Obtain the info of Registration
		$manager_name = $this->input->post('manager_name');
		$password     = $this->input->post('password');
		$introduction = $this->input->post('introduction');
		// Ensure your form's key fieled is not empty
		if($manager_name == FALSE || $password == FALSE)
		{
			$register_info = array(
				'status'  => '2',
				'msg'     => 'Managername, Pwd being empty is not allowed!'
				);
		}
		else
		{
			// Database operation : Check your username
			if($this->Model_Manager->checkUnique($manager_name))
			{
				$this->Model_Manager->addManager($manager_name,$password,$introduction);
				$register_info = array(
					'status'  => '0',
					'msg'     => 'Register Successful!'
					);
			}
			else
				$register_info = array(
					'status'  => '1',
					'msg'     => 'Your Managername is exist!'
					);
		}
		// return login info 
		$this->load->view('mobile_app/welcome_result',$register_info);
	}
	
	/*******************
	 * Action : Register
	 * Login the system 
	 */
	public function Login()
	{
		// Obtain the info of Login
		$manager_name = $this->input->post('manager_name');
		$password = $this->input->post('password');
		// Ensure your form is not empty
		if($manager_name == FALSE || $password == FALSE)
		{
			$login_info = array(
				'status'  => '2',
				'msg'     => 'Managername and Pwd being empty is not allowed!'
				);
		}
		else
		{
			// Database operation : Check your username and pwd
			if($this->Model_Manager->checkManager($manager_name,$password))
			{
				$manager_id = $this->Model_Manager->GetManagerId($manager_name);
				$login_info = array(
					'status'  => '0',
					'msg'     => $manager_id
					);
			}
			else
			{
				$login_info = array(
					'status'  => '1',
					'msg'     => 'Login Failed!'
					);
			}
		}
		// return login info 
		$this->load->view('mobile_app/welcome_result',$login_info);
	}
}
?>
