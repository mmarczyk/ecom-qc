<?php

$config = [
  'language' => 'pl',
  'title' => 'Tytuł z configa',
  'version' => '1.5',
  'dir_skin' => '/ecom/',
  'style' => 'style.css'
];

$sTitle = 'Tytuł strony';
$sDescription = 'Opis strony';

$lang = [
  'cf_no_word' => 'Wypełnij poprawnie wymagane pola',
  'cf_mail' => 'Podaj poprawny e-mail',
  'cf_wrong_value' => 'Podaj poprawną wartość1'
];

$aData = [
    'iPage' => 1
];

$iContent = 2;
$oPage = new class{
    function throwMenu($ind, $content, $subs, $title = false) {
        if($ind === 3) {
            return ''.
                '<div id="menu3">'.
                    '<ul>'.
                        '<li class="l1 selected">'.
                            '<a href="./">Kategoria 1</a>'.
                        '</li>'.
                        '<li class="l2">'.
                            '<a href="./">Kategoria 2</a>'.
                            '<ul class="sub1">'.
                                '<li class="l1">'.
                                    '<a href="./1">Subkategoria 2.1</a>'.
                                '</li>'.
                                '<li class="lL">'.
                                    '<a href="./">Subkategoria 2.2</a>'.
                                '</li>'.
                                '<li class="l1">'.
                                    '<a href="./">Subkategoria 2.3</a>'.
                                '</li>'.
                                '<li class="lL">'.
                                    '<a href="./">Subkategoria 2.4</a>'.
                                '</li>'.
                            '</ul>'.
                        '</li>'.
                        '<li class="lL">'.
                            '<a href="./">Kategoria 3</a>'.
                            '<ul class="sub1">'.
                                '<li class="l1">'.
                                    '<a href="./">Subkategoria 3.1</a>'.
                                '</li>'.
                                '<li class="lL">'.
                                    '<a href="./">Subkategoria 3.2</a>'.
                                '</li>'.
                            '</ul>'.
                        '</li>'.
                    '</ul>'.
                '</div>';
        }
    }
};

$oFile = new class{
    function listImagesByTypes( $iLink, $iType = 1, $bLinks = true ) {
        if($iType == 1) {
            return '<ul class="imagesList" id="imagesList'.$iType.'">'.
                        '<li class="l1">'.
                            ( isset( $bLinks ) ? '<a href="files/_demo_03.jpg" class="quickbox['.$iLink.']" title="">' : null).
                                '<img src="files/top1.jpg" alt="" />'.
                            ( isset( $bLinks ) ? '</a>' : null).
                        '</li>'.
                    '</ul>';
        } else {
            return '<ul class="imagesList" id="imagesList'.$iType.'">'.
                        '<li class="l2">'.
                            ( isset( $bLinks ) ? '<a href="files/_demo_04.jpg" class="quickbox['.$iLink.']" title="">' : null).
                                '<img src="files/top2.jpg" alt="" />'.
                            ( isset( $bLinks ) ? '</a>' : null).
                        '</li>'.
                        '<li class="lL">'.
                            ( isset( $bLinks ) ? '<a href="files/_demo_05.jpg" class="quickbox['.$iLink.']" title="Etiam quis velit">' : null).
                                '<img src="files/top3.jpg" alt=""/>'.
                            ( isset( $bLinks ) ? '</a>' : null).
                        '</li>'.
                    '</ul>';
        }
    }
};

define('CUSTOMER_PAGE', 'React');

require 'ecom/react-page.php';