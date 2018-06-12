<?php
/**
* Post Controller
*
* @author happyoniens
* @author coeci
*
*/
class Response
{
	public $status = 'fail';
    //public $msg = '';
	public $data = null;
}


class orderController{ 
   public static function getOrders($First, $Last){    
	$token = $_SERVER["HTTP_TOKEN"];
	
	$token = Flight::checkToken($token);
	$response = new Response();
	if(isset($token)){		
		$token = current($token);
		$ag = $token['agentid'];		
		$sql = "exec wwwGetAgOrders @agentID=$ag, @First='$First', @Last='$Last'";		
		$result = Flight::db()->query($sql);
		$response->data = $result;
		$response->status = 'success';
	} else {
		$response->data = NULL;
		$response->status = 'fail';
	}	
   echo Flight::json($response);
  }
  
  public static function getOrder($ID){    
	$token = $_SERVER["HTTP_TOKEN"];
	
	$token = Flight::checkToken($token);
	$response = new Response();
	if(isset($token)){		
		$token = current($token);
		$ag = $token['agentid'];		
		$sql = "exec wwwEditAgOrders @id=$ID, @agent=$ag";		
		$result = Flight::db()->query($sql);
		$response->data = $result;
		$response->status = 'success';
	} else {
		$response->data = NULL;
		$response->status = 'fail';
	}	
   echo Flight::json($response);
  }
  
  public static function createOrder(){
    $token = $_SERVER["HTTP_TOKEN"];	
	$token = Flight::checkToken($token);
	$response = new Response();
	
	$cname = Flight::request()->data->cname;	
	$address = Flight::request()->data->address;
	$org = Flight::request()->data->org;
	$contname = Flight::request()->data->contname;
	$contphone = Flight::request()->data->contphone;
	
	$contmail = Flight::request()->data->contmail;
	$orgrems = Flight::request()->data->orgrems;
	
	$dest = Flight::request()->data->dest;	
	$dname = Flight::request()->data->dname;
	$dadr = Flight::request()->data->dadr;
	$dcontname = Flight::request()->data->dcontname;
	$dcontphone	= Flight::request()->data->dcontphone;
	
	$dcontmail = Flight::request()->data->dcontmail;
	$destrems = Flight::request()->data->destrems;
	
	$type = Flight::request()->data->type;
	$packs = Flight::request()->data->packs;
	$wt = Flight::request()->data->wt;
	
	$volwt = Flight::request()->data->volwt;
	$courdate = Flight::request()->data->courdate;
	$courtimef = Flight::request()->data->courtimef;
	$courtimet = Flight::request()->data->courtimet;
	
	$ag = Flight::request()->data->ag;
	
	$rordnum = Flight::request()->data->rordnum;
	$rordnum = $rordnum ? $rordnum : 0;
	
	
	if (isset($cname,$address,$org,$token)){
	$token = current($token);
	$userin = $token['auser'];	
	
	$sql = "exec wwwSaveAgOrders
			@ORG='$org',
			@CName='$cname',
			@Address='$address',
			@ContName='$contname',
			@ContPhone='$contphone',
			@ContMail='$contmail',
			@OrgRems='$orgrems',
			@DEST=$dest,
			@DName='$dname',
			@DAdr='$dadr',
			@DContName='$dcontname',
			@DContPhone='$dcontphone',
			@DContMail='$dcontmail',
			@DESTRems='$destrems',
			@Type=$type,
			@Packs=$packs,
			@Wt=$wt,
			@VolWt=$volwt,
			@CourDate='$courdate',
			@CourTimeF='$courtimef',
			@CourTimeT='$courtimet',
			@Payr=$ag,
			@UserIn=$userin,
			@RordNum=$rordnum";
			
	
		echo $sql;
	}
    //$result = Flight::db()->query($sql);  
    //return $result;
  }

  /**
  * Gets Post with given Id
  * @param Int Id of searched post
  * @return post Post with the given Id
  * @todo Better error handling
  */
  public static function getPostWithId($post_id){
    $sql = "SELECT * FROM post WHERE id = '$post_id'";
    $result = Flight::db()->query($sql);
    //Todo: Better error handling
    if($result != false){
      return new post($result->fetch_assoc());
    }
  }
  /**
   * Create a post
   */
  public static function createPost(){
      if(!Flight::has('currentUser')){
          Flight::redirect('/');
      }

      $post = new post([
        'user' => Flight::get('currentUser')->id,
        'title' => Flight::request()->data->title,
        'content' => Flight::request()->data->content
      ]);

      $post->store();

  }
}
