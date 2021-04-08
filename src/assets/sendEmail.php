<?php

switch($_SERVER['REQUEST_METHOD']){
    case("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $json = file_get_contents('php://input');

        $params = json_decode($json);

        $name = $params->name;
        $email = $params->email;
        $street = $params->street;
        $town = $params->town;
        $state = $params->state;
        $zip = $params->zip;
        $message = $params->message;

        $recipient = 'smandable@gmail.com';
        $subject = 'new message';
        $headers = "From: $name <$email>";

        mail($recipient, $subject, $street, $town, $state, $zip, $message, $headers);
        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}