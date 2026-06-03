
<?php
$path = dirname(__FILE__);
require $path . '/PHPMailer/src/Exception.php';
require $path . '/PHPMailer/src/PHPMailer.php';
require $path . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;



function mailer($sendto, $subject, $htmlBody, $headers = false)
{
    try {
        $phpmailer = new PHPMailer(true);

        if (SMTP) {
            $phpmailer->isSMTP();
            $phpmailer->SMTPDebug = 3;
            $phpmailer->Debugoutput = function($str, $level) {
                file_put_contents('/tmp/mail_error.log', date('Y-m-d H:i:s') . " SMTP[$level]: $str\n", FILE_APPEND);
            };
            $phpmailer->Host       = 'dalidam.live';
            $phpmailer->SMTPAuth   = true;
            $phpmailer->Port       = 465;
            $phpmailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $phpmailer->Timeout    = 10;
            $phpmailer->Username   = 'Info@vinopark.dalidam.live';
            $phpmailer->Password   = 'xMWRwV5W8gdsrKp';
        }


        $phpmailer->setFrom(SND_FROM, SND_NAME);

        $addresses = explode(",", $sendto);

        foreach ($addresses as $address) {
            $phpmailer->addAddress(trim($address));
        }


        $phpmailer->addReplyTo(SND_FROM, SND_NAME);

        $phpmailer->isHTML(true);
        $phpmailer->Subject = $subject;
        $phpmailer->Body    = $htmlBody;
        $phpmailer->CharSet = "UTF-8";
        $phpmailer->AltBody = str_replace(array("<br>", "<br/>", "<BR>", "<BR/>"), "\r\n", strip_tags($htmlBody, "<br>"));
        $phpmailer->send();
        file_put_contents('/tmp/mail_error.log', date('Y-m-d H:i:s') . ' SUCCESS: sent to ' . $sendto . "\n", FILE_APPEND);
        return true;
    } catch (Exception $e) {
        file_put_contents('/tmp/mail_error.log', date('Y-m-d H:i:s') . ' ERROR: ' . $phpmailer->ErrorInfo . ' | ' . $e->getMessage() . "\n", FILE_APPEND);
        return false;
    }
}



function fileContentsToVar($file, $data)
{
    extract($data);
    ob_start();
    require($file);
    return ob_get_clean();
}
