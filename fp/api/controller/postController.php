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


class postController{

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
	$rordnum=$rordnum ? $rordnum : 0;
	$sql = "exec wwwSaveAgOrders
			@ORG=$params[org],
			@CName='$cname',
			@Address='$Address',
			@ContName='$ContName',
			@ContPhone='$ContPhone',
			@ContMail='$params[contmail]',
			@OrgRems='$OrgRems',
			@DEST=$params[dest],
			@DName='$DName',
			@DAdr='$DAdr',
			@DContName='$DContName',
			@DContPhone='$DContPhone',
			@DContMail='$params[dcontmail]',
			@DESTRems='$DESTRems',
			@Type=$params[type],
			@Packs=$params[packs],
			@Wt=$params[wt],
			@VolWt=$VolWt,
			@CourDate='$courdate',
			@CourTimeF='$courtimef',
			@CourTimeT='$courtimet',
			@Payr=$ag,
			@UserIn=$UserIn,
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
