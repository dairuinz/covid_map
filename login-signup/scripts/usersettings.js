var new_button1 = document.getElementById("confirm1");
var new_button2 =document.getElementById("confirm2");


async function settings() {

var username =document.getElementById("current_username").value;
var new_username = document.getElementById("new_username").value;
var conf_username = document.getElementById("conf_username").value;
if(username === '' && new_username === conf_username) {
    document.getElementById("error").innerHTML = "Empty current username!"; 
}
else if(username === '' && new_username !== conf_username) {
    document.getElementById("error").innerHTML = "Empty current username or not the same username!"; 
}








}























//new_button1.onclick=settings();
new_button2.onclick=settings();