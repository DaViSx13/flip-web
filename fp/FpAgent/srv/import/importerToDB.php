<?php
/**
 * Class importerToDB
 *
 * @author    		a.nikitaev
 * @description		
 */
require_once('filesInitializer.php');
require_once('queryBuilder.php');
require_once('dataInserter.php');
require_once('response.php');
require_once('tplStore.php');

class importerToDB {	
	var $file;	
	var $action;
	function importerToDB() {
		$this->file = null;
		$this->tpl = null;
		$this->action = null;
	}
	function import(){
		$tpl = new tplStore();		
		if($tpl->getTpl($this->action)){
			$responseJson = new Response();		
			$handle = new filesInitializer($this->file);
			if ($handle->uploaded) {					
				$build = new queryBuilder($handle->file_src_pathname, $tpl->getTpl($this->action));
				if ($build->builded){
					$data = new dataInserter($build->query);
					if($data->success){
						$responseJson->msg = $data->msg;
						$responseJson->success = true;
					} else {
						$responseJson->msg = $data->msg;
						$responseJson->success = false;
					}
				} else {
					$responseJson->msg = $build->error;
					$responseJson->success = false;
				}		
			} else {			
				$responseJson->msg = $handle->error;
				$responseJson->success = false;
			}
		} else {
			$responseJson->msg = 'Неправильно указан шаблон или такой шаблон импорта не существует!';
			$responseJson->success = false;
		}
		echo json_encode($responseJson);
	}
}
?>