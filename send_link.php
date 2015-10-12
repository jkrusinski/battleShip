<?php
//make the output JSON
header('Content-Type: application/json');

//Add composer files, mainly PHPMailer
require __DIR__ . '/vendor/autoload.php';

/**
 * Checks to make sure email in correct format
 * @param string $email client's email
 * @return bool|string returns false if no error in formatting, string with error if email incorrect format
 */
function emailValidation ($email) {
    //define error variable
    $err = '';

    if (strpos($email, '.') === false || strpos($email, '@') === false)
        $err .= 'Please enter a valid email address.';
    else $err = false;

    return $err;

}

/**
 * Sends the message
 * @param string $email
 * @param string $subject
 * @param string $message with html markup
 * @return bool
 * @throws Exception
 * @throws phpmailerException
 */
function sendMail ($email, $subject, $message) {

    //create a new PHPMailer instance
    $mail = new PHPMailer();

    //tell PHPMailer to use SMTP
    $mail->isSMTP();

    //enable debugging...
    $mail->SMTPDebug = 0;

    //ask for HTML-friendly debug output
    $mail->Debugoutput = 'html';

    //set the hostname of the server
    $mail->Host = 'smtp.gmail.com';

    //set SMTP port number
    $mail->Port = 587;

    //set encryption
    $mail->SMTPSecure = 'tls';

    //use SMTP authentication
    $mail->SMTPAuth = true;

    //Username
    $mail->Username = 'jrk.phpmailer@gmail.com';

    //Password
    $mail->Password = 'RH6snj.oKb^';

    //Set FROM field
    $mail->setFrom('jrk.phpmailer@gmail.com', 'Jerry Krusinski');

    //Set TO field
    $mail->addAddress($email);

    //Set the SUBJECT
    $mail->Subject = $subject;

    //Set Message
    $mail->msgHTML($message);

    //Send Message, Check for errors
    return $mail->send();

}


$email = $_POST['email'];

$result = emailValidation($email);

if(!$result){

    //Write the subject
    $subject = 'View battleship( ); on your desktop!';

    $html = "<h3 style='font-family: monospace;'>battleShip(); - A Game By Jerry Krusinski</h3>";
    $html .= "<br/><hr/>";
    $html .= "<p>Follow this <a href='//jkrusinski.com/battleShip'>link</a> to check out battleShip!";
    $html .= " Written in Javascript with jQuery, battleShip is a simple, fun, and addicting game built to ";
    $html .= "practice front end technologies. To view the source code, make sure to travel over to ";
    $html .= "its <a href='//github.com/jkrusinski/battleShip'>GitHub Repository</a> as well!</p>";
    $html .= "<hr/><p><a href='//jkrusinski.com'>My site</a> is always under construction with performance ";
    $html .= "enhancements and new projects added, so make sure to check back often!</p>";
    $html .= "<br/><p>Thank you for checking out my portfolio!</p>";

    $sent = sendMail($email, $subject, $html);

    if(!$sent) $result = 'Error in sendMail function';

}


echo json_encode(array(
    'error' => $result
));

