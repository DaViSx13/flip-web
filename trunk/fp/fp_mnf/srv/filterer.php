<?php
//фильтрация DB'образного массива по одному полю
class Filterer{
    private $key;
    private $value;

    function filter($arr, $key, $value){
        $this->key = $key;
        $this->value = $value;
        return array_values( array_filter($arr, array($this, 'filterFn')) );
    }

    private function filterFn($item){
       return (stripos(iconv("UTF-8", "windows-1251", $item[$this->key]), iconv("UTF-8", "windows-1251", $this->value)) !== false);
    }
}

?>