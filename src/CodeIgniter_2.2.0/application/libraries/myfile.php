<?php if (!defined('BASEPATH')) exit('No direct script access allowed'); 

class MyFile {
	
	// Which type of file is permitted
	protected $allowed_mime = array(
	    'image/png',
            'image/x-png',
            'image/gif',
	    'image/jpg',
            'image/jpeg',
            'image/pjpeg'
	);
	// Sina SAE's Storage Service 
	protected $sae_s;
	// Storage Service's Domain where our data stored
	protected $domain = 'haha ! you are a fool! ';

	/*************
	 * Constructor
	 */
	function __construct($para)
	{
		// Create a new Object of SAE's Storage Service
		$this->sae_s   = new SaeStorage();
		// Set Storage Service's Domain
		$this->domain  = $para['domain'];
	}
	
	/*****************************
	 * Upload file to Cloud Server ..
	 * para : $postkey -> The key of file in the post msg..
	 */
    public function UploadFile($postkey)
    {
		$filename     = $_FILES[$postkey]['tmp_name'];
        	$filetype     = $_FILES[$postkey]['type'];
		$tmp_filename = $_FILES[$postkey]['tmp_name'];
		
		// Security Check ..
		
		// Is it a valid file ?
       		if(!is_uploaded_file($filename))
		{ 
            		die('Sorry, It is not a correct file!f');
        	}
		// Is the file's mime-type correct ?
		if(!in_array($filetype, $this->allowed_mime))
		{
            		die('Sorry, Only image type is allowed!');
        	}
		// Ensure the file extension correct.
		//$filename = substr($filename, 0, strpos($filename, '.'));// Cut off the file extension
		//$filename .= $allowed_mime[$filetype];// Rewrite the file extension 
		$file_ext     = substr($filetype, strpos($filetype, '/')+1);
		$new_filename = date("YmdHis") . '_' . rand(10000, 99999) . '.' . $file_ext;
		// Store the file in the SaeStorage Service.
		$url = $this->sae_s->upload($this->domain,$new_filename,$tmp_filename);
		if(!$url) 
		{
			die('Storing file in the SaeStorage is failed!');
		}
		// Sort out result..
		$result = array(
			'filename' => $new_filename,
			'fileurl'  => $url
			);
		return $result;
    }
	
	/*****************************
	 * Download file to mobile app ..
	 * para : $filename -> the file in Storage that we want to download..
	 */
	public function DownloadFile($filename)
	{
		return $this->sae_s->read($this->domain,$filename);
	}
	
	/*****************************
	 * Download file to mobile app ..
	 * para : $filename -> the file in Storage that we want to download..
	 */
	public function DeleteFile($filename)
	{
		return $this->sae_s->delete($this->domain,$filename);
	}
}
?>
