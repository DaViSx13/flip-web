<?php
/************************************
*    Allows sorting multi-dimensional
*    arrays by a specific key and in
*    asc or desc order
**/

class multiSort
{
    private $key;    //key in your array

    //runs the sort, and returns sorted array
    function run ($myarray, $key_to_sort, $type_of_sort = '')
    {
        $this->key = $key_to_sort;

        if ($type_of_sort == 'desc')
            uasort($myarray, array($this, 'myreverse_compare'));
        else
            uasort($myarray, array($this, 'mycompare'));

        return $myarray;
    }

    //for ascending order
    private function mycompare($x, $y)
    {    //echo 'sort';
       return strnatcasecmp(iconv("UTF-8", "windows-1251", ($x[$this->key])), iconv("UTF-8", "windows-1251", ($y[$this->key])));
       /*
        if ( $x[$this->key] == $y[$this->key] )
            return 0;
        else if ( $x[$this->key] < $y[$this->key] )
            return -1;
        else
            return 1;
*/
    }

    //for descending order
    private function myreverse_compare($x, $y)
    {
      return -1 * strnatcasecmp(iconv("UTF-8", "windows-1251", ($x[$this->key])), iconv("UTF-8", "windows-1251", ($y[$this->key])));
      /*  if ( $x[$this->key] == $y[$this->key] )
            return 0;
        else if ( $x[$this->key] > $y[$this->key] )
            return -1;
        else
            return 1;*/
    }
}
?>