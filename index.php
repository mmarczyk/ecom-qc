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
    'iPage' => 1,
    'iProducts' => 5,
    'iSubpagesShow' => 1
];

$GLOBALS['aMenuTypes'] = [
    3 => $sTitle,
    2 => $sTitle
];

$iContent = 2;
class Pages
{
    public $mData;
    public $aPages;
    public $aPagesChildrens;
    protected $aPagesParentsTypes;
    private static $oInstance;

    public static function getInstance()
    {
        if (!isset(self::$oInstance)) {
            self::$oInstance = new Pages();
        }
        return self::$oInstance;
    } // end function getInstance

    /**
     * Constructor
     * @return void
     */
    private function __construct()
    {
    } // end function __construct

    function generateCache()
    {
        $this->aPagesParentsTypes = [
            3 => true,
            2 => true
        ];
        $this->aPages = unserialize(file_get_contents("aPages.dat"));
        $this->aPagesChildrens = [
            1 => [20, 21, 22, 23]
        ];
    }

    function generatePageParents()
    {
    }
    function generateMenuData($iType, $iPageCurrent, $iDepthLimit, $iDepth = 0, $iPageParent = null)
    {
        if ($iType == 3) {
            $this->mData = [
                0 => [
                    6 => true,
                    7 => true,
                    8 => true,
                ],
                7 => [
                    14 => true,
                    13 => true
                ]
            ];
        } else if ($iType == 2) {
            $this->mData = [
                0 => [
                    1 => true,
                    3 => true,
                    4 => true,
                    2 => true
                ],
                3 => [
                    9 => true,
                    10 => true,
                    11 => true,
                    12 => true
                ]
            ];
        }
    }

    function throwMenu($ind, $content, $subs, $title = false)
    {
        if ($ind === 3) {
            return '' .
                '<div id="menu3">' .
                '<ul>' .
                '<li class="l1 selected">' .
                '<a href="./">Kategoria 1</a>' .
                '</li>' .
                '<li class="l2">' .
                '<a href="./">Kategoria 2</a>' .
                '<ul class="sub1">' .
                '<li class="l1">' .
                '<a href="./1">Subkategoria 2.1</a>' .
                '</li>' .
                '<li class="lL">' .
                '<a href="./">Subkategoria 2.2</a>' .
                '</li>' .
                '<li class="l1">' .
                '<a href="./">Subkategoria 2.3</a>' .
                '</li>' .
                '<li class="lL">' .
                '<a href="./">Subkategoria 2.4</a>' .
                '</li>' .
                '</ul>' .
                '</li>' .
                '<li class="lL">' .
                '<a href="./">Kategoria 3</a>' .
                '<ul class="sub1">' .
                '<li class="l1">' .
                '<a href="./">Subkategoria 3.1</a>' .
                '</li>' .
                '<li class="lL">' .
                '<a href="./">Subkategoria 3.2</a>' .
                '</li>' .
                '</ul>' .
                '</li>' .
                '</ul>' .
                '</div>';
        }
    }
}

$oPage = Pages::getInstance();

class Files
{
    public $aFilesImages;
    protected $aImagesTypes;

    function listImagesByTypes($iLink, $iType = 1, $bLinks = true)
    {
        if ($iType == 1) {
            return '<ul class="imagesList" id="imagesList' . $iType . '">' .
                '<li class="l1">' .
                (isset($bLinks) ? '<a href="files/_demo_03.jpg" class="quickbox[' . $iLink . ']" title="">' : null) .
                '<img src="files/top1.jpg" alt="" />' .
                (isset($bLinks) ? '</a>' : null) .
                '</li>' .
                '</ul>';
        } else {
            return '<ul class="imagesList" id="imagesList' . $iType . '">' .
                '<li class="l2">' .
                (isset($bLinks) ? '<a href="files/_demo_04.jpg" class="quickbox[' . $iLink . ']" title="">' : null) .
                '<img src="files/top2.jpg" alt="" />' .
                (isset($bLinks) ? '</a>' : null) .
                '</li>' .
                '<li class="lL">' .
                (isset($bLinks) ? '<a href="files/_demo_05.jpg" class="quickbox[' . $iLink . ']" title="Etiam quis velit">' : null) .
                '<img src="files/top3.jpg" alt=""/>' .
                (isset($bLinks) ? '</a>' : null) .
                '</li>' .
                '</ul>';
        }
    }

    function generateCache()
    {
        $this->aImagesTypes = [
            1 => [
                1 => [0],
                2 => [1, 2]
            ]
        ];
        $this->aFilesImages = [
            [
                'sDescription' => '',
                'sFileName' => 'top1.jpg',
                'iSizeValue2' => ''
            ],
            [
                'sDescription' => '',
                'sFileName' => 'top2.jpg',
                'iSizeValue2' => ''
            ],
            [
                'sDescription' => 'Etiam quis velit',
                'sFileName' => 'top3.jpg',
                'iSizeValue2' => ''
            ]
        ];
        $this->aImagesDefault = [
            2 => [
                [
                    'sFileName' => 'top1.jpg',
                    'iSizeValue1' => ''
                ],
                [
                    'sFileName' => 'top2.jpg',
                    'iSizeValue1' => ''
                ],
                [
                    'sFileName' => 'top3.jpg',
                    'iSizeValue1' => ''
                ]
            ]
        ];
    }
};

$oFile = new Files();

class Products
{
    public $aProducts = null;

    public static function getInstance()
    {
        return new Products();
    }

    public function generateCache()
    {
        $this->aProducts = [
            [
                'iProduct' => 0,
                'sName' => 'Expedition',
                'mPrice' => '299.00',
                'sLinkName' => '?8,expedition'
            ],
            [
                'iProduct' => 1,
                'sName' => 'Mandi (Vibram, Nubuck)',
                'mPrice' => '64.00',
                'sLinkName' => '?7,mandi-(vibram-nubuck)'
            ],
            [
                'iProduct' => 2,
                'sName' => 'Myobelt 5 SB',
                'mPrice' => '99.00',
                'sLinkName' => '?2,myobelt-5-sb'
            ]
        ];
    }
    public function generateProductsSearchListArray($sPhrase)
    {
    }
    public function generateProductsListArray()
    {
        return [0, 1, 2];
    }

    public function listProducts($iPage, $length)
    {
        return '<div id="products" class="productsList">' .
            '<div class="sort">Sortuj wg:' .
            '<ul>' .
            '<li>Domyślnie</li>' .
            '<li>' .
            '<a href="?akcesoria-podroznicze,8&amp;sSort=name">Nazwa</a>' .
            '</li>' .
            '<li>' .
            '<a href="?akcesoria-podroznicze,8&amp;sSort=price">Cena</a>' .
            '</li>' .
            '</ul>' .
            '</div>' .
            '<ul class="list">' .
            '<li class="l1 i1 column1">' .
            '<h2>' .
            '<a href="?8,expedition">Expedition</a>' .
            '</h2>' .
            '<div class="photo">' .
            '<a href="?8,expedition" tabindex="-1">' .
            '<img src="files/top3.jpg" alt="Tetiami bauis tredi" />' .
            '</a>' .
            '</div>' .
            '<div class="description">' .
            'Proin elit. Vivamus eleifend augue id pede cursus ornare. Suspendisse malesuada.' .
            '</div>' .
            '<div class="basket">' .
            '<a href="?koszyk,15&amp;iProductAdd=8&amp;iQuantity=1" rel="nofollow" title="Do koszyka: Expedition">Do koszyka</a>' .
            '</div>' .
            '<div class="price">' .
            '<em>Cena:</em>' .
            '<strong>299.00</strong>' .
            '<span>zł</span>' .
            '</div>' .
            '</li>' .
            '<li class="l2 i0 column0">' .
            '<h2>' .
            '<a href="?7,mandi-(vibram-nubuck)">Mandi (Vibram, Nubuck)</a>' .
            '</h2>' .
            '<div class="photo">' .
            '<a href="?7,mandi-(vibram-nubuck)" tabindex="-1">' .
            '<img src="files/top1.jpg" alt="Etiam quis velit" />' .
            '</a>' .
            '</div>' .
            '<div class="description">' .
            'Aliquam ac est et lectus viverra molestie. Nunc orci. Suspendisse in metus.' .
            '</div>' .
            '<div class="basket">' .
            '<a href="?koszyk,15&amp;iProductAdd=7&amp;iQuantity=1" rel="nofollow" title="Do koszyka: Mandi (Vibram, Nubuck)">Do koszyka</a>' .
            '</div>' .
            '<div class="price">' .
            '<em>Cena:</em>' .
            '<strong>64.00</strong>' .
            '<span>zł</span>' .
            '</div>' .
            '</li>' .
            '<li class="lL i1 column0">' .
            '<h2>' .
            '<a href="?2,myobelt-5-sb">Myobelt 5 SB</a>' .
            '</h2>' .
            '<div class="photo">' .
            '<a href="?2,myobelt-5-sb" tabindex="-1">' .
            '<img src="files/top2.jpg" alt="Nam elementum" />' .
            '</a>' .
            '</div>' .
            '<div class="description">' .
            'Morbi iaculis posuere massa. Ut volutpat, velit at ullamcorper consectetuer, erat leo accumsan metus, sit amet scelerisque odio ' .
            'felis sagittis turpis. Phasellus eget lacus. Ut consectetuer. Nam non eros eget dui tincidunt auctor.' .
            '</div>' .
            '<div class="basket">' .
            '<a href="?koszyk,15&amp;iProductAdd=2&amp;iQuantity=1" rel="nofollow" title="Do koszyka: Myobelt 5 SB">Do koszyka</a>' .
            '</div>' .
            '<div class="price">' .
            '<em>Cena:</em>' .
            '<strong>99.00</strong>' .
            '<span>zł</span>' .
            '</div>' .
            '</li>' .
            '</ul>' .
            '</div>' .
            '</div>';
    }
};


function changeTxt($sText, $sOption)
{
    return $sText;
}

define('CUSTOMER_PAGE', 'React');
define('DIR_FILES', 'files/');
define('DISPLAY_SUBCATEGORY_PRODUCTS', false);

require 'ecom/react-page.php';
