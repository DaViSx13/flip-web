<?php
/**
* User Controller
*
* @author happyoniens
* @author coeci
*
*/
class Response
{
	public $status = 'fail';    
	public $data = null;
}
class typeController{

    /**
    * Get User with Id
    * @param Int Id of User
    * @return User
    */
    public static function getTypes(){
      $sql = "SELECT 'Документ' as Name, 1 as Code union select 'Не документ' as Name, 0 as Code";
	  $sql = iconv("UTF-8", "windows-1251", $sql);
      $sql = stripslashes($sql);
      $result = Flight::db()->query($sql);
	$response = new Response();
	$response->data = $result;
	$response->status = 'success';
   echo Flight::json($response);
    }

    /**
     * Get User with Email
     * @param  String $email Email
     * @return Object Return userobject or false
     */
    public static function checkToken($token){
      $sql = "exec checkToken @token = '$token'";
      $result = Flight::db()->query($sql);
      if($result != false){
        return $result;
      }else {
        return false;
      }
    }

    /**
     * Save properties of the user profile
     * @return [JSON] Success or error message
     */
    public static function saveProfile(){

        if(!Flight::has('currentUser')){
            Flight::json(['Error'=>'No Access']);
        }
        
        $currentUser = Flight::get('currentUser');

        if(isset(Flight::request()->query->bio)){
            $currentUser->bio = Flight::request()->data->bio;
        }else if(isset(Flight::request()->query->password)){
            if(!isset(Flight::request()->data->passwordold) || !isset(Flight::request()->data->passwordnew1) || !isset(Flight::request()->data->passwordnew2)){
                Flight::json(['success' => false, 'exception' => 'Empty fields']);
            }

            if($currentUser->password === hash("sha256", Flight::request()->data->passwordold)){
                if(Flight::request()->data->passwordnew1 == Flight::request()->data->passwordnew2){
                    $currentUser->password = hash("sha256", Flight::request()->data->passwordnew1);
                }else{
                    Flight::json(['success' => false, 'exception' => 'New passwords are not the same']);
                }
            }else{
                Flight::json(['success' => false, 'exception' => 'Old password is not correct ']);
            }
        }

        $result = $currentUser->update();

        if($result != false){
            $_SESSION['user'] = Flight::users()->getUserWithId(Flight::get('currentUser')->id);


            Flight::json(['success' => true]);
        }else{
            Flight::json(['sucess' => false, 'exception' => 'An error']);
        }
    }

}
