<?php
$log = '/tmp/mail_error.log';
if (file_exists($log)) {
    echo '<pre>' . htmlspecialchars(file_get_contents($log)) . '</pre>';
} else {
    echo 'Лог пустой — ошибок нет или письмо ещё не отправлялось';
}
