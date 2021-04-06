<?php
/*
* Class tplStore
*
* @author:    a.nikitaev
* @description: Хранилище шаблонов импорта
* 0 параметр процедуры, 1 тип данных, 2 номер столбца, 3 пустые значения, 4 дефолтное значение
* constant - константа задающаяся в момент описания шаблона, ключевое слово пишется вместо номера столбца.
* Типы даных: str, int, float, time, date
*/
class tplStore {
	/*
	* tpls ?????? ???????? ???????
	*/
	var $tpls; 
	function tplStore() {
		$this->tpls = array (
							'importWebWB' => array( 
												array('wwwImportWebWB'),
												array('ord_no', 'int', 0, 1),
												array('s_city', 'str', 1, 1),
												array('s_co', 'str', 2, 1),
												array('s_adr', 'str', 3, 1),
												array('s_name', 'str', 4, 1),
												array('s_tel', 'str', 5, 1),
												array('s_mail', 'str', 6, 1),
												array('s_ref', 'str', 7, 1),
												array('r_city', 'str', 8, 1),
												array('r_co', 'str', 9, 1),
												array('r_adr', 'str', 10, 1),
												array('r_name', 'str', 11, 1),
												array('r_tel', 'str', 12, 1),
												array('r_mail', 'str', 13, 1),
												array('r_ref', 'str', 14, 1),
												array('pcs', 'float', 15, 1),
												array('wt', 'float', 16, 1),
												array('vol_wt', 'float', 17, 1),
												array('t_pac', 'str', 18, 1),
												array('descr', 'str', 19, 1),
												array('inssum', 'float', 20, 1),
												array('metpaym', 'str', 21, 1),
												array('payr', 'str', 22, 1),
												array('user_in', 'constant', $_SESSION['xUser'])
												),
							'importPod' => array( 
												array('wwwImportPod'),
												array('wb_no', 'str', 0, 1),
												array('p_d_in', 'date', 1, 1),
												array('tdd', 'date', 1, 1),
												array('rcpn', 'str', 2, 1),
												array('auser', 'constant', $_SESSION['xUser'])
												),
							'importOrders' => array( 
												array('wwwImportAgOrders'),
												array('org', 'str', 0, 1),
												array('cname', 'str', 1, 1),
												array('address', 'str', 2, 1),
												array('contname', 'str', 3, 1),
												array('contphone', 'str', 4, 1),
												array('contmail', 'str', 5, 0, NULL),
												array('orgrems', 'str', 6, 0, NULL),
												array('dest', 'str', 7, 1),
												array('dname', 'str', 8, 1),
												array('dadr', 'str', 9, 1),
												array('dcontname', 'str', 10, 1),
												array('dcontphone', 'str', 11, 1),
												array('dcontmail', 'str', 12, 0, NULL),
												array('destrems', 'str', 13, 0, NULL),												
												array('packs', 'int', 14, 1),
												array('wt', 'float', 15, 1),
												array('volwt', 'float', 16, 0, NULL),
												array('payr', 'constant', $_SESSION['xAgentID']),
												array('userin', 'constant', $_SESSION['xUser']),
												array('courdate', 'date', 17, 0, NULL),
												array('courtimef', 'time', 18, 0, NULL),
												array('courtimet', 'time', 19, 0, NULL)
												),
							'importTemplate' => array(
							                    array('wwwImportLKsetTemplateGroup'),
							                    array('TmplName', 'str', 0, 1),
							                    array('clID', 'constant', $_SESSION['xUser']),
							                    array('Name', 'str', 1, 1),
                                                array('City', 'str', 5, 1),
                                                array('Adr', 'str', 4, 1),
                                                array('ContName', 'str', 2, 1),
                                                array('ContPhone', 'str', 3, 0, NULL),
							)
							);
	}
	function getTpl($tpl) {
		return $this->tpls [$tpl];
	}
}
?>