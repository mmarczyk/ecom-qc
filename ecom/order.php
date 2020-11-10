<?php 
// More about design modifications - www.opensolution.org/Quick.Cart/docs/ext_6.6/?id=en-design
if( !defined( 'CUSTOMER_PAGE' ) )
    exit;

$config['this_is_order_page'] = true;

print "<!--";
print "empty=".$oOrder->checkEmptyBasket().PHP_EOL;
print "ordersend=".isset( $_POST['sOrderSend'] ).PHP_EOL;
print "fields=".$oOrder->checkFields( $_POST ).PHP_EOL;
print "-->";
if( $oOrder->checkEmptyBasket( ) === false && isset( $_POST['sOrderSend'] ) && $oOrder->checkFields( $_POST ) === true ){
    // save and print order
    $iOrder = $oOrder->addOrder( $_POST );

/*    if( !empty( $config['orders_email'] ) && checkEmail( $config['orders_email'] ) ){
        $oOrder->sendEmailWithOrderDetails( $iOrder );
    }*/
}

require_once __DIR__."/page.php";