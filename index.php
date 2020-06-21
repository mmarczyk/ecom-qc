<?php

$config = [
  'language' => 'pl',
  'title' => 'Tytuł z configa',
  'version' => '1.5',
  'dir_skin' => '/ecom/',
  'style' => 'css/react-page.css'
];

$sTitle = 'Tytuł strony';
$sDescription = 'Opis strony';

$lang = [
  'cf_no_word' => 'Wypełnij poprawnie wymagane pola',
  'cf_mail' => 'Podaj poprawny e-mail',
  'cf_wrong_value' => 'Podaj poprawną wartość1'
];

$iContent = 2;
$oPage = new class{
    function throwMenu($ind, $content, $subs, $title = false) {
        if($ind === 3) {
            return ''.
                '<div id=\"menu3\">'.
                    '.<ul>'.
                        '<li class=\"l1 selected\">'.
                            '<a href=\"./\">Kategoria 1</a>'.
                        '</li>'.
                        '<li class=\"l2\">'.
                            '<a href=\"./\">Kategoria 2</a>'.
                            '<ul class=\"sub1\">'.
                                '<li class=\"l1\">'.
                                    '<a href=\"./\">Subkategoria 2.1</a>'.
                                '</li>'.
                                '<li class=\"lL\">'.
                                    '<a href=\"./\">Subkategoria 2.2</a>'.
                                '</li>'.
                            '</ul>'.
                        '</li>'.
                        '<li class=\"lL\">'.
                            '<a href=\"./\">Kategoria 3</a>'.
                        '</li>'.
                    '</ul>'.
                '</div>';
        }
    }
};

define('CUSTOMER_PAGE', 'React');

require 'ecom/react-page.php';