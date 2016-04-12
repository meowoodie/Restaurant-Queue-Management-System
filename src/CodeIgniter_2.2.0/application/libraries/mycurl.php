<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MycUrl{

	protected $ch;
	
	function __construct($Url)
	{
		$this->ch = curl_init();
		curl_setopt ($this->ch, CURLOPT_URL, $Url);            //设置GET的URL地址
		curl_setopt ($this->ch, CURLOPT_RETURNTRANSFER, true); //将结果保存成字符串
		//curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 10);         //连接超时时间s
		//curl_setopt ($ch, CURLOPT_TIMEOUT, 10);                //执行超时时间s
		//curl_setopt ($ch, CURLOPT_DNS_CACHE_TIMEOUT, 1800);    //DNS解析缓存保存时间半小时
		//curl_setopt ($ch, CURLOPT_HEADER,0);                   //丢掉头信息
	}
	
	public function Post($PostData)
	{
		curl_setopt($this->ch, CURLOPT_POST, 1);             			//启用POST数据
		curl_setopt($this->ch, CURLOPT_POSTFIELDS, $PostData);			//提交POST数据
		$rData = curl_exec($this->ch);
		curl_close($this->ch);
		unset($this->ch);
		return $rData;
	}
	
	public function Get()
	{
		$rData = curl_exec($this->ch);
		curl_close($this->ch);
		unset($this->ch);
		return $rData;
	}
	
	public function test()
	{
		echo "test my own class!";
	}
}
?>
