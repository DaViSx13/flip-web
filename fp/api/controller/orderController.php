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

  /**
  * Get all Posts from Database in Array
  * @return Array Array with all Posts
  */
   public static function getOrders($First, $Last){
    $token = Flight::request()->query->token;
    $sql = "exec wwwGetAgOrders @First='$First', @Last='$Last', @token='$token'";
    $result = Flight::db()->query($sql);
	$response = new Response();
	$response->data = $result;
	$response->status = 'success';
   echo Flight::json($response);
  }
  
  public static function createOrder(){
    $token = Flight::request()->query->token;
	$cname = Flight::request()->query->cname;
	$rordnum = Flight::request()->query->rordnum;
	$rordnum = $rordnum ? $rordnum : 0;
	$address = Flight::request()->query->address;
	$org = Flight::request()->query->org;
	$contname = Flight::request()->query->contname;
	$contphone = Flight::request()->query->contphone;
	$contmail = Flight::request()->query->contmail;
	$orgrems = Flight::request()->query->orgrems;
	$dest = Flight::request()->query->dest;
	$dname = Flight::request()->query->dname;
	$dadr = Flight::request()->query->dadr;
	$dcontname = Flight::request()->query->dcontname;
	$dcontphone	= Flight::request()->query->dcontphone;
	$dcontmail = Flight::request()->query->dcontmail;
	$destrems = Flight::request()->query->destrems;
	$type = Flight::request()->query->type;
	$packs = Flight::request()->query->packs;
	$wt = Flight::request()->query->wt;
	$volwt = Flight::request()->query->volwt;
	$courdate = Flight::request()->query->courdate;
	$courtimef = Flight::request()->query->courtimef;
	$courtimet = Flight::request()->query->courtimet;
	$ag = Flight::request()->query->ag;
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
			@Payr=$ag,//--&&
			@UserIn=$userin,
			@RordNum=$rordnum";
    $result = Flight::db()->query($sql);  
    return $result;
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
