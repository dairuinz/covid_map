var loginBut= document.getElementById("loginBut");

function login_auth(){
   
    var fields ={ 
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    }
    //fetch url -> path pros ton poro xrisimopoihshs: to  backend/login.js
        fetch('/AUTH', 
            {
                method: 'POST', //tha kanw post sto AUTH (stin pleura tou client panta ta fetch)
                headers: {
                            'Content-Type': 'application/json' //edw apla leme ton tupo ton dedomenwn pou tha steiloume
                        },
                body: JSON.stringify(fields) //body packaging ola ta dedomena pou thelw(dld thelw auta ta dedomena na ta steilw ws Json se morfi string)
            })
        .then(res => res.text()) //epeidh ta dedomena se string morfi xrisimopoiw tin text()
        .then(data => {
            if ( data === 'Incorrect Username and/or Password!')
                document.getElementById("erMes").innerHTML= "Username or Password incorrect";
            else if ( data === 'Please enter Username and Password!')
                document.getElementById("erMes").innerHTML ="You need to fill all fields";
                
            else 
                window.location.href = data
            
        })
}

loginBut.onclick=login_auth;


