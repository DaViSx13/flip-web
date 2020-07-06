<?php
/**
 * Class filesInitializer
 *
 * @author    a.nikitaev
 * @description		Инициализация и загрузка файла
 */
 
class filesInitializer {
	var $file_src_name;
	var $file_src_name_ext;
	var $file_src_name_body;
	var $file_src_mime;
	var $file_src_size;
	var $file_src_error;
	var $file_src_pathname;
	var $uploaded;
	var $log;
	var $error;
	function filesInitializer($file) {
		$this->file_src_name      = '';        
        $this->file_src_name_ext  = '';
        $this->file_src_mime      = '';
        $this->file_src_size      = '';
		$this->file_src_error     = '';
		$this->file_src_pathname  = '';
		$this->file_src_name_body = '';
		$this->uploaded           = true;
		$this->error              = '';
        $this->log                = '';
		$mime_from_browser        = null;
		if (!$file) {
            $this->uploaded = false;
            $this->error = 'Файловая ошибка. Попробуйте еще раз.';
        }
		if (empty($file)) {
                $this->uploaded = false;
                $this->error = 'Файловая ошибка. Попробуйте еще раз.';
            }
		if ($this->uploaded) {
                $this->file_src_error         = trim($file['error']);
                switch($this->file_src_error) {
                    case UPLOAD_ERR_OK:
                        // all is OK
                        $this->log .= '- upload OK<br />';
                        break;
                    case UPLOAD_ERR_INI_SIZE:
                        $this->uploaded = false;
                        $this->error = 'Ошибка загрузки файла (загруженный файл превышает лимит директивы the upload_max_filesize из php.ini).';
                        break;
                    case UPLOAD_ERR_FORM_SIZE:
                        $this->uploaded = false;
                        $this->error = 'Ошибка загрузки файла (загруженный файл превышает лимит директивы MAX_FILE_SIZE определенной в HTML-форме).';
                        break;
                    case UPLOAD_ERR_PARTIAL:
                        $this->uploaded = false;
                        $this->error = 'Ошибка загрузки файла (файл загружен частично).';
                        break;
                    case UPLOAD_ERR_NO_FILE:
                        $this->uploaded = false;
                        $this->error = 'Ошибка загрузки файла (файл не был загружен).';
                        break;
                    case @UPLOAD_ERR_NO_TMP_DIR:
                        $this->uploaded = false;
                        $this->error = 'Ошибка загрузки файла (Нет каталога для записи файла).';
                        break;
                    case @UPLOAD_ERR_CANT_WRITE:
                        $this->uploaded = false;
                        $this->error = 'Ошибка загрузки файла (Нет прав на запись).';
                        break;
                    case @UPLOAD_ERR_EXTENSION:
                        $this->uploaded = false;
                        $this->error = 'uploaded_err_extension';
                        break;
                    default:
                        $this->uploaded = false;
                        $this->error = 'Ошибка загрузки файла (Неизвесная ошибка).' . ' ('.$this->file_src_error.')';
                }
            }
		if ($this->uploaded) {
                $this->file_src_pathname   = $file['tmp_name'];
                $this->file_src_name       = $file['name'];
                if ($this->file_src_name == '') {
                    $this->uploaded = false;
                    $this->error = 'Ошибка загрузки файла. Попробуйте еще раз.';
                }
            }
		if ($this->uploaded) {
                $this->log .= '- file name OK<br />';
                preg_match('/\.([^\.]*$)/', $this->file_src_name, $extension);
                if (is_array($extension) && sizeof($extension) > 0) {
                    $this->file_src_name_ext      = strtolower($extension[1]);
                    $this->file_src_name_body     = substr($this->file_src_name, 0, ((strlen($this->file_src_name) - strlen($this->file_src_name_ext)))-1);
                } else {
                    $this->file_src_name_ext      = '';
                    $this->file_src_name_body     = $this->file_src_name;
                }
                $this->file_src_size = $file['size'];
                $mime_from_browser = $file['type'];
            }
		if (!empty($mime_from_browser) && !$this->file_src_mime || !is_string($this->file_src_mime) || empty($this->file_src_mime)) {
                $this->file_src_mime =$mime_from_browser;
                $this->log .= '- MIME type detected as ' . $this->file_src_mime . ' by browser<br />';
                if (preg_match("/^([\.\-\w]+)\/([\.\-\w]+)(.*)$/i", $this->file_src_mime)) {
                    $this->file_src_mime = preg_replace("/^([\.\-\w]+)\/([\.\-\w]+)(.*)$/i", '$1/$2', $this->file_src_mime);
                    $this->log .= '-&nbsp;MIME validated as ' . $this->file_src_mime . '<br />';
                } else {
                    $this->file_src_mime = null;
                }
            }
		if ($this->uploaded && !empty($this->file_src_size) && $this->file_src_size > 1500000) {
				$this->uploaded = false;
				$this->error = 'Файл слишком большой!';			
			}
	}
}
?>