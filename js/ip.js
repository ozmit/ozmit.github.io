async function func(){
    var plr = document.getElementById("player");
    var p = plr.getElementsByTagName('p')[0];

    const request = await fetch("https://ipinfo.io/json");
    const jsonResponse = await request.json();

    p.innerHTML = `Twoje IP:<br>${jsonResponse.ip}<br>${jsonResponse.country}<br>${jsonResponse.city}<br>${jsonResponse.postal}<br>${jsonResponse.loc}`;
}
func();