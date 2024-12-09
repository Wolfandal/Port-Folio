<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $prenom = htmlspecialchars($_POST['prenom']);
    $nom = htmlspecialchars($_POST['nom']);
    $message = htmlspecialchars($_POST['message']);

    $to = 'arthur.jumelle@epfedu.fr';
    $subject = 'Nouveau message de contact';
    $body = "Prénom: $prenom\nNom: $nom\nMessage:\n$message";
    $headers = "From: no-reply@votredomaine.com";

    if (mail($to, $subject, $body, $headers)) {
        echo 'Email envoyé avec succès!';
    } else {
        echo 'Erreur lors de l\'envoi de l\'email.';
    }
}
?>
