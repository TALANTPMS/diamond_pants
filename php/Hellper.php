
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
        $phpmailer = new PHPMailer();

        if (SMTP) {
            $phpmailer->isSMTP();
            $phpmailer->Host       = 'smtp.gmail.com'; // SMTP сервер — замените на свой если не Gmail
            $phpmailer->SMTPAuth   = true;
            $phpmailer->Port       = 465;              // 465 для SSL, 587 для TLS
            $phpmailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // 'ssl' для порта 465
            $phpmailer->Username   = 'ВАШA_ПОЧТА@gmail.com';      // <<< ЗАМЕНИТЕ
            $phpmailer->Password   = 'ПАРОЛЬ_ПРИЛОЖЕНИЯ';          // <<< ЗАМЕНИТЕ (App Password из Google)
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
        return true;
    } catch (Exception $e) {
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
