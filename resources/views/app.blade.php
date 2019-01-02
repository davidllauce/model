<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Somos la primera academia virtual Preuniversitaria, dedicada a impartir clases en video, clases en vivo, simulacros de examenes de admisión virtuales para todos los postulantes a las distintas universidades nacionales.">
    <meta name="keywords" content="Nota20, nota 20, nota, 20, academia, preuniversitaria, virtual, academia preuniversitaria, academia virtual, universidades, universidades nacionales, cursos virtuales, simulacros de examenes de admsión virtuales, examenes de admisión, examenes virtuales, examenes de admisión virtuales, razonamiento verbal, razonamiento matematico, algebra, literatura, geometria">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="app-name" content="nota20">
    <link rel="shortcut icon" href="img/favicon.png">
    <title>Academia Virtual {{ config('app.name', 'Laravel') }}</title>

    <!--Styles-->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link href="https://fonts.googleapis.com/css?family=Signika+Negative" rel="stylesheet">
    <!--End styles--> 
    
    <script src="//google.com/recaptcha/api.js"></script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-130103836-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-130103836-1');
    </script>
    
</head>
<body>
    <!--Template-->
    <div class='app' id='app'></div>
    <!--End template-->

    <!--Script-->
    <script src="{{ asset('js/main.js') }}"></script>
    <script src="{{ asset('js/vanilla/main.js') }}"></script>
    <script src="{{ asset('js/vanilla/css.js') }}"></script>	
</body>
</html>
