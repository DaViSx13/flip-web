#powershell однако!!!

#from json to csv
$json = Get-Content D:\temp\_lang\translate.js | ConvertFrom-Json
$json | Export-Csv D:\temp\_lang\translate.csv -NoTypeInformation -Encoding UTF8 -Delimiter ';'


#from csv to json
$csv = Get-Content D:\temp\_lang\translate.csv | ConvertFrom-Csv -Delimiter ';'
$csv | ConvertTo-Json | Set-Content D:\temp\_lang\translate1.js -Encoding UTF8
