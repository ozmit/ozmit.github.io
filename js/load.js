async function func(){
    var sidenav = document.getElementById('sidenav')

    //const request = await fetch("https://zmitruk.000webhostapp.com/sidenav.html");
    //const jsonResponse = await request.json();

    const request = await fetch("https://pastebin.com/raw/7cgUMZQ6", data = {}, {
        method: "GET",
        headers: {
          Accept: "text/html",
          Authorization: "",
          "User-Agent": "any-name",
          "Access-Control-Allow-Origin": "<origin>"
        },
    })

    console.log(request);

    //sidenav.innerHTML = ;
}
func();