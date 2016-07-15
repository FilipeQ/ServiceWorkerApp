if('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('/sw.js',{scope:'/'})
        .then(function() {
            console.log('Service Worker Registered');
        }).catch(function() {
            console.log('Service worker registration failed');
        });
}else{
    console.log('Service worker not supported');
}

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        try{
            let jsonResponse = JSON.parse(xhttp.responseText);

            document.getElementById("cover-notice").innerHTML = "<h1>"+jsonResponse.title+"</h1>" +
                "<img width='100%' src='"+jsonResponse.img+"'/>" +
                "<div class='box-notice-description'>"+jsonResponse.description+"</div>";
        }catch(e){
            document.getElementById("cover-notice").innerHTML = xhttp.responseText;
        }
    }
};
xhttp.open("GET", "/getSimulateNotice", true);
xhttp.send();
