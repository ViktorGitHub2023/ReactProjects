Testtömeg index számítása

Készíts a megadott api-hoz űrlapot, amivel el tudod küldeni a testsúly(kg) és testmagasság(cm) adatokat!
A visszakapott JSON fájlból irasd ki az adatokat!
https://informatikaora.hu/webprog/tti.php

API hívás:
https://informatikaora.hu/webprog/tti.php/?kg=90&cm=200

Minta az API hívás eredményére JSON formában:
{"kg":"70","cm":"178","tti":22.09,"minosites":"normál testalkat","testkep":"body_correct.gif","tobblet":0}

A JSON forma dekódolva - az olvashatóság érdekében:
stdClass Object
(
    [kg] => 70
    [cm] => 178
    [tti] => 22.09
    [minosites] => normal testalkat
    [testkep] => body_correct.gif
    [tobblet] => 0
)
