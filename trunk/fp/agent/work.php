<?php 
header("Content-type: text/html; charset=windows-1251");
require_once "secureCheck.php"; 
?>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=windows-1251" />
	<title>Доставки</title>

<style>
body {font-family: verdana; font-size: 10pt; margin: 0;}

.tblData {border-collapse: collapse; font-family: verdana; font-size: 8pt; cursor: default;}
.tblData td { padding-left: 5px; padding-right: 5px;}
.tblData th, .header {background-color: #2F4E77; color: white; padding: 3px; cursor: pointer;}
.tblData tr.even {background-color: #DEEDFF;}
.tblData tr.cur {background-color: gray; color: white;}
.splash {position: absolute; left:0; top: 0;  width: 100%; height: 100%; background-color: gray; filter: alpha(opacity=50); opacity:0.5; z-index: 1001;}
.dia {position: absolute; left:700px; top: 400px; background-color: #DEEDFF; z-index: 1010; font-size: 10pt;  cursor: default;}
</style>

		<link type="text/css" href="/jq/css/redmond/jquery-ui-1.8.2.custom.css" rel="stylesheet" />	
		<script type="text/javascript" src="/jq/js/jquery-1.4.2.min.js"></script>
		<script type="text/javascript" src="/jq/js/jquery-ui-1.8.2.custom.min.js"></script>

    <script type="text/javascript" src="../spry/includes_packed/SpryUtils.js"></script>
    <script type="text/javascript" src="../spry/includes_packed/xpath.js"></script>
    <script type="text/javascript" src="../spry/includes_packed/SpryData.js"></script>    

<link href="../spry/includes/SpryValidationTextField.css" rel="stylesheet" type="text/css" /> 
<script src="../spry/includes/SpryValidationTextField.js" type="text/javascript"></script> 

<link href="../spry/includes/SpryValidationTextarea.css" rel="stylesheet" type="text/css" /> 
<script src="../spry/includes/SpryValidationTextarea.js" type="text/javascript"></script> 

<script language="JavaScript" type="text/javascript" src="../spry/includes/SpryAutoSuggest.js"></script>
<link href="../spry/includes/SpryAutoSuggest.css" rel="stylesheet" type="text/css" />
       
<script type="text/javascript">
var dsWBs = new Spry.Data.XMLDataSet("getAgentWbs.php", "data/row", {useCache: false});
var newPeriod, newAgent;

//var dsWbEx = new Spry.Data.XMLDataSet("getWbEx.php?wbno={dsWBs::@wb_no}", "data/row", {useCache: false});
var dsWbEx = new Spry.Data.XMLDataSet("getWbEx.php", "data/row", {useCache: false, method: "POST", postData: "wbno={dsWBs::@wb_no}"});

var dsExCodes = new Spry.Data.XMLDataSet("getExCodes.php", "data/row", {useCache: false});


var $dialogViewEX;
var $dialogNewEX;

$(document).ready(function() {
   
	$dialogViewEX = $('#view_ex').dialog({autoOpen: false, modal: true, width: 500, height: 300, title: 'Исключения накладной ' /*+ (dsWbEx.getCurrentRow())['@wbno']*/ });
	
    $dialogNewEX = $('#new_ex').dialog({autoOpen: false, modal: true, width: 500, height: 400, title: 'Новое исключение'
                                        , buttons: {
                                            'Отмена': function(){$(this).dialog('close');},                                            
                                            'Сохранить': function(){ validateonsubmit_new_ex(document.getElementById('f_new_ex')); }
//                                            'Сохранить': function(){document.getElementById('f_new_ex').submit();}
                                        }
                                        });
   $( "#Filter" ).buttonset();
    //$("#btnRefresh").button();
   //$("#selectAgent").combobox(); 
    
});


function newEX(){
    //alert(5);
    document.getElementById('f_new_ex').reset();
    $dialogNewEX.dialog('open');    
    }

function showWbEx(){
    //$('#view_ex').dialog({ modal: true, width: 500, height: 300, title: 'Исключения накладной ' /*+ (dsWbEx.getCurrentRow())['@wbno']*/ })
    $dialogViewEX.dialog('open');
    }

function exportXLS(){
  var para = '';
  if (newPeriod) { 
        para += 'newPeriod='+newPeriod;
        if (newAgent) { para += '&newAgent='+newAgent };
                 }
    else if (newAgent) { para += 'newAgent='+newAgent };
   
   para += '&filter=' + $("input:radio:checked").attr("value");
  //alert("getAgentWbsXLS.php?"+para);
  //$.get("getAgentWbsXLS.php?"+para);
  window.location.href = "getAgentWbsXLS.php?"+para;
}

function reloadData(){
//  alert(newPeriod);
//  alert(newAgent);  
  var para = '';
  if (newPeriod) { 
        para += 'newPeriod='+newPeriod;
        if (newAgent) { para += '&newAgent='+newAgent };
                 }
    else if (newAgent) { para += 'newAgent='+newAgent };
   

  dsWBs.setURL("getAgentWbs.php?"+para);
  dsWBs.loadData();  
}

////////////////
function HideDia(){
   Spry.$('splash').style.display = 'none'; 
   Spry.$('PODedit').style.display = 'none';
   Spry.$('updatePOD').reset();   
}

function showDia(){

   var s=Spry.$('splash');
   var o=Spry.$('PODedit');
   s.style.display = 'block'; 
   o.style.display = 'block';
   o.style.left = (s.clientWidth - o.clientWidth) / 2;
   o.style.top = (s.clientHeight - o.clientHeight) / 2;
   
   //Spry.$('p_d_in').focus();
   //Spry.$('p_d_in').value = "11.11.11";
}
////////////////

function HideDia_tar(){
   Spry.$('splash').style.display = 'none'; 
   Spry.$('tar_a_edit').style.display = 'none';
   Spry.$('update_tar_a').reset();   
}

function showDia_tar(){

   var s=Spry.$('splash');
   var o=Spry.$('tar_a_edit');
   s.style.display = 'block'; 
   o.style.display = 'block';
   o.style.left = (s.clientWidth - o.clientWidth) / 2;
   o.style.top = (s.clientHeight - o.clientHeight) / 2;
}

////////////////

/////////// pod
function updateResponseDiv(req){
    //alert(req.xhRequest.responseText);

    msg = req.xhRequest.responseText;
    var re = /Operation completed successfully/ig;
    if ( re.test(msg) ) 
//    if ( msg=='Operation completed successfully' ) 
        {
        var dt = new Date();
        var s='';
        s = dt.getDate()+'.'+(dt.getMonth()+1)+'.'+dt.getFullYear()    
        //alert( Spry.$('p_d_in').value );
        var row = dsWBs.getCurrentRow();
        row['@dod_txt'] = Spry.$('p_d_in').value + " " + Spry.$('tdd').value;
        //row['@dod_txt'] = $('#p_d_in').attr(value) + " " + $('#tdd').attr(value);
        row['@p_d_in_txt'] = s;

        var rgn = Spry.Data.getRegion('wbReg');
        rgn.updateContent();
    
        HideDia();
        }
      else {  
        alert('Ошибка!'+ '='+msg+'='+re.test(msg))
        };
   re=null;     
}

function validateonsubmit(form){

if (Spry.Widget.Form.validate(form) == true){
	Spry.Utils.submitForm(form, updateResponseDiv);
    }
return false;
}
/////////// pod


/////////// tar_ag
function updateResponseDiv_tar_ag(req){
    //alert(req.xhRequest.responseText);

    var msg = req.xhRequest.responseText;
    var re = /Operation completed successfully/ig;
    if ( re.test(msg) ) 
//    if ( msg=='Operation completed successfully' ) 
        {
        reloadData()
/*
        var dt = new Date();
        var s='';
        s = dt.getDate()+'.'+(dt.getMonth()+1)+'.'+dt.getFullYear()    
        //alert( Spry.$('p_d_in').value );
        var row = dsWBs.getCurrentRow();
        row['@dod_txt'] = Spry.$('p_d_in').value;
        row['@p_d_in_txt'] = s;

        var rgn = Spry.Data.getRegion('wbReg');
        rgn.updateContent();
*/    
        HideDia_tar();

        }
      else {  
        alert('Ошибка!'+ '='+msg+'='+re.test(msg))
        };
   re=null;     
}

function validateonsubmit_tar_ag(form){

if (Spry.Widget.Form.validate(form) == true){
	Spry.Utils.submitForm(form, updateResponseDiv_tar_ag);
    }
return false;
}
/////////// tar_ag

/////////// new_ex
function updateResponseDiv_new_ex(req){
//    alert(req.xhRequest.responseText); return false;
    var msg = req.xhRequest.responseText;
    var re = /Operation completed successfully/ig;
    if ( re.test(msg) ) 
//    if ( msg=='Operation completed successfully' ) 
        {
        $dialogNewEX.dialog('close');
        reloadData();    
        }
      else {  
        alert('Ошибка!'+ '='+msg+'='+re.test(msg))
        };
   re=null;     
}

function validateonsubmit_new_ex(form){

if (Spry.Widget.Form.validate(form) == true){
	Spry.Utils.submitForm(form, updateResponseDiv_new_ex);
    }
return false;
}
/////////// new_ex

function roundStr(x, dec){
    var s = x.toString();
    var end = s.indexOf('.');
    
    if (end == -1) return s;
    
    end += 1 + dec
    
    return s.substring(0, end)     
}

function roundNum(x, dec){
    
    var res = x*Math.pow(10, dec);
    res = Math.round(res)
    res = res*Math.pow(10,-dec)
    
//    return res    

    var s = res.toString();
    var end = s.indexOf('.');
    
    if (end == -1) return s;
    
    end += 1 + dec
    return s.substring(0, end)     
}
////////////////////

//var observer = { onPostUpdate: function(notifier, data) { alert((333)); } };
function calcTotals(){
dsWBs.setColumnType("wt", "number");
var rows = dsWBs.getData();
var totalWT=0, totalVol_wt=0
var totaltar_flip_b=0, totaltar_flip_a=0, totaltar_flip_t=0
var totaltar_ag_b=0, totaltar_ag_a=0, totaltar_ag_t=0   
//alert(rows.length);
for (var i = 0; i < rows.length; i++)
{
  totalWT += 1*rows[i]["@wt"]
  totalVol_wt += 1*rows[i]["@vol_wt"]

  totaltar_flip_b += 1*rows[i]["@tar_flip_b"]
  totaltar_flip_a += 1*rows[i]["@tar_flip_a"]
  totaltar_flip_t += 1*rows[i]["@tar_flip_t"]

  totaltar_ag_b += 1*rows[i]["@tar_ag_b"]
  totaltar_ag_a += 1*rows[i]["@tar_ag_a"]
  totaltar_ag_t += 1*rows[i]["@tar_ag_t"]
  //if (rows[i]["name"] == "Spry") return rows[i]["ds_RowID"];
};
 $('#totalWT').text( totalWT ? roundNum(totalWT, 2): '' );
 $('#totalVol_wt').text( totalVol_wt ? roundNum(totalVol_wt, 2): '' );

 $('#totaltar_flip_b').text( totaltar_flip_b ? roundNum(totaltar_flip_b, 2): '');
 $('#totaltar_flip_a').text( totaltar_flip_a ? roundNum(totaltar_flip_a, 2): '');
 $('#totaltar_flip_t').text( totaltar_flip_t ? roundNum(totaltar_flip_t, 2): '');

 $('#totaltar_ag_b').text( totaltar_ag_b ? roundNum(totaltar_ag_b, 2): '');
 $('#totaltar_ag_a').text( totaltar_ag_a ? roundNum(totaltar_ag_a, 2): '');
 $('#totaltar_ag_t').text( totaltar_ag_t ? roundNum(totaltar_ag_t, 2): '');
//alert(totalWT);
}

var observer = { onPostUpdate: calcTotals };
Spry.Data.Region.addObserver("wbReg", observer);

///////////////////////

function xxx(){
    
        alert( Spry.$('p_d_in').value );
/*        
    var r = dsWBs.getCurrentRow();
    //alert( r['@wb_no'] );
    r['@wb_no'] = '1111111111111';
    //alert( r['@wb_no'] );
    var rgn = Spry.Data.getRegion('wbReg');
    rgn.updateContent();
*/    
} 


function filterClick(){
//$("#log").text( $("input:radio:checked").attr("value") );    
    filterDS( $("input:radio:checked").attr("value") );
};

 function filterDS(dir){

    if(dir == "all"){
        dsWBs.filter(null);
        return;
    }

    var regExp = new RegExp(dir, "i");

    var filterFunc = function(ds, row, rowNumber)
	{
		var str = row["@dir"];
		if (str && str.search(regExp) != -1)
			return row;
		return null;
	};
    
    dsWBs.filter(filterFunc);

 }
 
 function testF(){
   //$("#totalWT").text('555'); $('# 
   //Spry.$('totalWT').innerText = '555';
   Spry.$('selectAgent').focus();
   //$("#log").text( $.datepicker.formatDate('dd.mm.yy', new Date()) );
   //$("#log").text( $.datepicker.formatDate('yymmdd', new Date()) );
   var dt = $("#xPeriod").val();
   $("#log").text( $.datepicker.formatDate('dd.mm.yy', $.datepicker.parseDate('yymmdd', dt )) );
   //$("#log").text( $("#xPeriod").val() );
 }
 
 
</script>

</head>

<body>
<table border="1" style="width: 100%; height: 100%;  border-collapse: collapse; background-color: #F0F8FF;">
<tr>
<td>

<table style="width: 100%; height: 100%;  border-collapse: collapse;">
<tr><td>
<!--input type="button" value="rfr" onclick="dsWBs.loadData();"/-->
<!--input type="button" value="rfr" onclick="xxx();"/-->
<?php 
//echo $_SESSION['xUser']; echo"<BR>";
//echo $_SESSION['xAgentID'];  echo"<BR>";
echo $_SESSION['xAgentName']; // echo"<BR>";


///seperVisor///
if ( $_SESSION['xAgentID'] == -1){
    
    include "dbConnect.php";
    
    $query = "exec wwwGetAgents";
    $result=mssql_query($query);
    
    echo "<select id=\"selectAgent\" onchange=\"newAgent = this.value; reloadData()\">";
    while ($row = mssql_fetch_array($result, MSSQL_ASSOC)) {
            echo "<option value=\"" . htmlspecialchars ( $row["partcode"] ) . "\"> ($row[partloc]) $row[partname] "; //htmlspecialchars 
    }
    echo "</select>";
    }
///seperVisor///

?>
 [<a href="../logout.php">Выйти</a>]
<br />
Период <select id="xPeriod" onchange="newPeriod = this.value; reloadData()">
<?php
setlocale(LC_TIME,'rus','ru', 'RU_ru', 'ru-RU', 'ru_RU.CP1251', 'rus_RUS.CP1251', 'Russian_Russia.1251');
$date = getdate();

for ($i = 0; $i <= 5; $i++) {
    $d = mktime(0, 0, 0, $date['mon']-$i, 1, $date['year']) ;
    echo  "<option value=\"" . strftime('%Y%m01', $d) . "\">" . strftime('%b %Y', $d);
    }
?>
</select>
<input id="btnRefresh" type="button" value="Обновить" onclick="reloadData()"/>

</td>

<td>
<a href="../fp_mnf/app.php">Заказы и Манифесты</a><!--aan Меню типа -->
</td>

<td align="right"><img src="http://flippost.com/assets/templates/fl/images/logo.gif"/></td>
</tr>
</table>

</td>
</tr>

<tr class="tblData">
<td>

            <span style="float: left;" id="Filter"  onclick=" filterClick()" > 
                <input type="radio" name="wbFilter" value="all" id="radioAll"  checked="true" /><label for="radioAll" >Все</label> 
                <input type="radio" name="wbFilter" value="in"  id="radioIn"  /><label for="radioIn" title="--> Флип" >Входящие</label> 
                <input type="radio" name="wbFilter" value="out" id="radioOut" /><label for="radioOut" title="Флип -->">Исходящие</label>
            </span>
            <span id="log"></span>
            <!--input type="button" value="test" onclick="testF()"/-->
</td>
</tr>

<tr height="90%">
<td>
<div id="wbReg" spry:region="dsWBs" style="width: 100%; height: 100%; overflow: auto;" align1="center">


<div spry:state="loading">Загрузка данных...</div>
<div spry:state="error">Ошибка загрузки данных!</div>
<table border="1"  spry:state="ready" class="tblData">
    <tr>
        <td colspan="22">
            <span style="float: right"> <img width="20" src="/img/xls.jpg" onclick="exportXLS()" style="cursor: pointer;" title="Экспорт данных в Excel"/></span>
        </td>
    </tr>
	<tr>
		<td></td>
		<td></td>
		<td>Всего: {ds_RowCount}</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<th id="totalWT"></th>
		<th id="totalVol_wt"></th>
		<th id="totaltar_flip_b"></th>
		<th id="totaltar_flip_a"></th>
		<th id="totaltar_flip_t"></th>
		<td></td>
		<th id="totaltar_ag_b"></th>
		<th id="totaltar_ag_a"></th>
		<th id="totaltar_ag_t"></th>
		<td></td>
		<td></td>
	</tr>
    <tr>
		<th rowspan="2"></th>
		<th rowspan="2" spry:sort="@is_ex">ИС</th>
		<th rowspan="2" spry:sort="@wb_no">Накладная</th>
		<th rowspan="2" spry:sort="@d_acc_txt">Принято</th>
		<th rowspan="2" spry:sort="@dod_txt">Доставлено</th>
		<th rowspan="2" spry:sort="@rcpn">Получил</th>
		<th rowspan="2" spry:sort="@p_d_in_txt">Подтв.</th>
		<th rowspan="2" spry:sort="@org">ORG</th>
		<th rowspan="2" spry:sort="@dest">DEST</th>
		<th rowspan="2" spry:sort="@t_srv">Услуга</th>
		<th rowspan="2" spry:sort="@s_co">Отправитель</th>
		<th rowspan="2" spry:sort="@r_co">Получатель</th>
		<th rowspan="2" spry:sort="@wt">Вес</th>
		<th rowspan="2" spry:sort="@vol_wt">Об.вес</th>
		<th colspan="4">тариф Флип</th>
		<th colspan="5">тариф Аг</th>
	</tr>
	<tr>
		<th spry:sort="@tar_flip_b">баз.</th>
		<th spry:sort="@tar_flip_a">доп.</th>
		<th spry:sort="@tar_flip_t">Всего</th>
		<th spry:sort="@rem_flip">прим.</th>
		<th spry:sort="@tar_ag_b">баз.</th>
		<th spry:sort="@tar_ag_a">доп.</th>
		<th spry:sort="@tar_ag_t">Всего</th>
		<th spry:sort="@rem_ag">прим.</th>
		<th >Заявка</th>
	</tr>
	<tr spry:repeat="dsWBs" spry:even="even" spry:select="cur" spry:setrow="dsWBs">
		<td><img src="/img/newEx.png" width="15" style="cursor: pointer;" onclick="newEX()" title="Новая ИС"/></td>
		<td><img src="/img/stop1.png" width="15" style="cursor: pointer;"  spry:if=" {@is_ex} > 0" onclick="showWbEx()" title="Просмотреть ИС"/></td>
		<td>{@wb_no}</td>
		<td>{@d_acc_txt}</td>
		<td>{@dod_txt}</td>
		<td>{@rcpn}</td>
		<td>{@p_d_in_txt}<div onclick="showDia()" style="text-align: center; cursor: pointer; color: blue;" spry:if="!'{@p_d_in_txt}' && '{@dir}'=='out'" title="Внести ПоД">&lt;POD&gt;</div></td>
		<td>{@org}</td>
		<td>{@dest}</td>
		<td>{@t_srv}</td>
		<td>{@s_co}</td>
		<td>{@r_co}</td>
		<td>{@wt}</td>
		<td>{@vol_wt}</td>
		<td>{@tar_flip_b}</td>
		<td>{@tar_flip_a}</td>
		<td>{@tar_flip_t}</td>
		<td>{@rem_flip}</td>
		<td>{@tar_ag_b}</td>
		<td onclick1="if( '{@tar_ag_a}'!='' ) showDia_tar()" style1="cursor: pointer; color: blue">{@tar_ag_a}</td>
		<td>{@tar_ag_t}</td>
		<td>{@rem_ag}</td>
		<td onclick="if( '{@tar_ag_a}'!='' ) showDia_tar()" style="cursor: pointer; color: blue" title="{@req_rem}">{@req_tar_a}<span spry:if=" '{@tar_ag_id}'!='' && '{@req_tar_a}'=='' " >+</span></td>
	</tr>

</table>
</div>


</td>
</tr>

</table>



<!-- dialogs -->

<div class="splash" style="display: none;" id="splash"></div>

<!-- editPOD begin  -->
<div class="dia" style="display: none;" id="PODedit" spry:detailregion="dsWBs" align="center">
<div style="padding: 5; background-color: #004080; color: white;"><b>Подтверждение о доставке накладной</b></div>
<div style="padding: 5;">Накладная № <b>{@wb_no}</b> &nbsp;&nbsp;&nbsp;&nbsp;  РДД <b>{@dtd_txt}</b></div>
<br />
<form name="updatePOD" id="updatePOD" action="updatePOD.php" method="post" onsubmit="return validateonsubmit(this);">
<input type="hidden" name="wb_no" value="{@wb_no}"/>
<table style=" font-family: verdana; font-size: 10pt;">
<tr><td>Дата</td>
    <td>
    <span id="i1">
      <input type="text" name="p_d_in" id="p_d_in"/>
      <!--span class="textfieldInvalidFormatMsg">Invalid format.</span--> 
    </span>
    <script type="text/javascript">
    	var textfieldwidget1 = new Spry.Widget.ValidationTextField("i1", "date", {format:"dd.mm.yyyy", hint:"дд.мм.гггг", validateOn:"blur", useCharacterMasking:true});
    </script>
    </td>
</tr>
<tr><td>Время</td>
    <td>
     <span id="i2">
      <input type="text" name="tdd" id="tdd"/>
      <!--span class="textfieldInvalidFormatMsg">Invalid format.</span--> 
    </span>
    <script type="text/javascript">
    	var textfieldwidget2 = new Spry.Widget.ValidationTextField("i2", "time", {format:"HH:mm", hint:"чч:мм", validateOn:"blur", useCharacterMasking:true});
    </script>
    </td>
</tr>
<tr><td>Получатель</td>
    <td>
     <span id="i3">
      <input type="text" name="rcpn" id="rcpn"/>
    </span>
    <script type="text/javascript">
    	//var textfieldwidget3 = new Spry.Widget.ValidationTextField("i3", "custom", {pattern: "b", isRequired: true});
        var textfieldwidget3 = new Spry.Widget.ValidationTextField("i3", "none", {minChars:3, isRequired: true, validateOn:"blur"});
    </script>
    </td>
</tr>
</table>
<input type="submit" value="Сохранить" /><input type="button" value="Отменить" onclick="HideDia()"/>
</form>
</div>
<!-- editPOD end  -->

<!-- edit_tar_a_ag begin  -->
<div class="dia" style="display: none;" id="tar_a_edit" spry:detailregion="dsWBs" align="center">
<!--div style="padding: 5; background-color: #004080; color: white;"><b>Извините, функция временно недоступна!</b></div>
<input type="button" value="Отменить" onclick="HideDia_tar()"/-->
<div style="padding: 5; background-color: #004080; color: white;"><b>Заявка на доп. тариф</b></div>
<div style="padding: 5;">Накладная № <b>{@wb_no}</b> &nbsp;&nbsp;&nbsp;&nbsp;  РДД <b>{@dtd_txt}</b></div>
<br />

<form name="update_tar_a" id="update_tar_a" action="updatetara.php" method="post" onsubmit="return validateonsubmit_tar_ag(this);">
<input type="hidden" name="wb_no" value="{@wb_no}"/>
<input type="hidden" name="interid" value="{@tar_ag_id}"/>
<table style=" font-family: verdana; font-size: 10pt;">
<tr><td>Доп. тариф</td>
    <td>
      <input type="text" name="tar_a_ag" id="tar_a_ag"  value="{@req_tar_a}" value1="{@tar_ag_a}"/>
    </td>
</tr>
<tr><td>Примечание</td>
    <td>
      <textarea name="rem_ag" id="rem_ag" cols="32" rows="5">{@req_rem}</textarea><!-- {@rem_ag} -->
    </td>
</tr>
</table>
<input type="submit" value="Сохранить" /><input type="button" value="Отменить" onclick="HideDia_tar()"/>
</form>
</div>
<!-- edit_tar_a_ag end  -->

<!-- view_ex begin  -->
<div id="view_ex">
<table>
    <tr><td>
        <div spry:region="dsWbEx">
        <table class="tblData" border="1" style="width: 100%;">
        <tr >
            <th>Накладная</th>
            <th>Код</th>
            <th>Трек</th>
            <th>Описание</th>
            <th>Дата события</th>
        </tr>
        <tr spry:repeat="dsWbEx" spry:even="even" spry:select="cur" spry:setrow="dsWbEx">
            <td>{@wbno}</td>
            <td>{@excode}</td>
            <td>{@loc}</td>
            <td>{@exdesc}</td>
            <td>{@raised_txt}</td>
        </tr>
        </table>
        </div>
    </td></tr>

    <tr><td>
        <div spry:detailregion="dsWbEx" style="font-size: 10pt;"><div class="header">Содержание происшествия:</div>{@ofvers}</div>
    </td></tr>
</table>


</div>
<!-- view_ex end  -->


<!-- new_ex begin  -->
<div id="new_ex"  spry:detailregion1="dsWBs">
<form id="f_new_ex" name="f_new_ex" method="post" action="newEx.php" onsubmit="return validateonsubmit_new_ex(this);">
<table style="font-size: 10pt;" rules1="rows">
		<tr>
			<td><span>Накладная</span></td>
			<td spry:detailregion="dsWBs"> <input id="exWBno" name="exWBno" type="text" size="15"  readonly="1" value="{@wb_no}"/></td>
		</tr>
		<tr>
			<td><span>Код места происшествия</span></td>
			<td><span id="wexLoc"><input id="exLoc" name="exLoc" type="text" size="5"/></span> </td>
        <script type="text/javascript">
        	var widgetexRptd = new Spry.Widget.ValidationTextField("wexLoc", "none", {minChars:3, maxChars:5, validateOn:"blur"});
        	//var widgetexRptd = new Spry.Widget.ValidationTextField("wexLoc", "custom", {minChars:3, maxChars:5, validateOn:"blur", pattern:"AAA??", useCharacterMasking:true});
        </script>
		</tr>
		<tr>
			<td><span>Дата и время события</span></td>
			<td><span id="wexRaised"><input id="exRaised" name="exRaised" type="text" size="10" /></span>
				<span id="wexRaisedTime"><input id="exRaisedTime" name="exRaisedTime" type="text" size="5" /></span></td>
        <script type="text/javascript">
        	var widgetexRaised = new Spry.Widget.ValidationTextField("wexRaised", "date", {format:"dd.mm.yyyy", hint:"дд.мм.гггг", validateOn:"blur", useCharacterMasking:true});
        	var widgetexRaisedTime = new Spry.Widget.ValidationTextField("wexRaisedTime", "time", {format:"HH:mm", hint:"чч:мм", validateOn:"blur", useCharacterMasking:true});
        </script>
                
		</tr>
		<tr>
			<td><span>Дата отчета о событии</span></td>
			<td><span id="wexRptd"><input id="exRptd" name="exRptd" type="text" size="10" /></span> </td>
        <script type="text/javascript">
        	var widgetexRptd = new Spry.Widget.ValidationTextField("wexRptd", "date", {format:"dd.mm.yyyy", hint:"дд.мм.гггг", validateOn:"blur", useCharacterMasking:true});
        </script>
		</tr>
		<tr>
			<td><span>Код ИС</span></td>
			<td spry:region="dsExCodes"> <select name="exCode" id="exCode" style="width: 95%;"> <option spry:repeat="dsExCodes" value="{@excode}">{@excode} - {@exdesc}</option> </select></td>
		</tr>
		<tr>
			<td><span>Содержание происшествия</span></td>
			<td><span id="wexContent"><textarea name="exContent" id="exContent" cols="40" rows="6"></textarea></span></td>
        <script type="text/javascript">
        	var widgetexContent = new Spry.Widget.ValidationTextarea("wexContent");
        </script>
		</tr>
</table>
</form>
</div>
<!-- new_ex end  -->



<!--  -->
</body>
</html>