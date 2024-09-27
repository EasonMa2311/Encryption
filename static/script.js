
var w = document.getElementById("Encryption_button");
var x = document.getElementById("Decryption_button");
var y = document.getElementById("encryption");
var z = document.getElementById("decryption");

w.style.display = "None";
x.style.display = "block";
y.style.display = "block";
z.style.display = "None";

function encryptMessage() {
    var message = document.getElementById('message').value;
    var password = document.getElementById('password_to_encrypte').value;
    if (message != "" ){
        $.post("/encrypt", { message: message,password:password }, function(data) {
        $('#encrypted_message').text(data.encrypted_message);
        $('#key').text(data.key);
    });} else {
        alert("Invalid Message")
    }
}

function decryptMessage() {
    var message = $('#decrypt_message').val();
    var key = $('#decrypt_key').val();
    var password = document.getElementById('password_to_decrypte').value;
    if (message != ""){
        $.post("/decrypt", { message: message, key: key,password:password }, function(data) {
        $('#decrypted_message').text(data.decrypted_message);
    });} else {
        alert("Invalid Message")

    }
}
function show_encryption(){
    var w = document.getElementById("Encryption_button");
    var x = document.getElementById("Decryption_button");
    var y = document.getElementById("encryption");
    var z = document.getElementById("decryption");
    
    w.style.display = "None";
    x.style.display = "block";
    y.style.display = "block";
    z.style.display = "None";
}
function show_decryption(){
    var w = document.getElementById("Encryption_button");
    var x = document.getElementById("Decryption_button");
    var y = document.getElementById("encryption");
    var z = document.getElementById("decryption");
    
    w.style.display = "Block";
    x.style.display = "None";
    y.style.display = "None";
    z.style.display = "Block";
}
function Copy_text(ID){
    var copyText = document.getElementById(ID).textContent;

    

    
    navigator.clipboard.writeText(copyText);

    if (copyText != "") {
        alert("Copied");
    } else {
        alert("No Text to copy!");
    }
}