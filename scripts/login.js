document.querySelector("form").addEventListener("submit", loginFun);
var regdUsers = JSON.parse(localStorage.getItem("userCreds"));
//console.log(regdUsers);

function loginFun() {
  event.preventDefault();
  var enteredEmail = document.querySelector("#email").value;
  var enteredPass = document.querySelector("#pass").value;
  //console.log(email, pass);
  for (var i = 0; i < regdUsers.length; i++) {
    console.log(regdUsers[i]);
    if (
      regdUsers[i].email == enteredEmail &&
      regdUsers[i].password == enteredPass
    ) {
      alert("login success");
      window.location.href = "indexb.html";
      break;
    } else {
      alert("login failed");
      break;
    }
  }
}


//declearing html elements

const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

//if user hover on img div 

imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = "block";
});

//if we hover out from img div

imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = "none";
});

//lets work for image showing functionality when we choose an image to upload

//when we choose a photo to upload

file.addEventListener('change', function(){
    //this refers to file
    const choosedFile = this.files[0];

    if (choosedFile) {

        const reader = new FileReader(); //FileReader is a predefined function of JS

        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);

      
    }
});