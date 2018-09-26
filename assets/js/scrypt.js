var buttonMobile = document.getElementById("mobileButton");
var navMenuMobile = document.querySelector(".nav");

buttonMobile.addEventListener("click", function(){
    if(buttonMobile.classList.contains("mobile__button--active")){
        buttonMobile.classList.remove("mobile__button--active");
        navMenuMobile.classList.remove("nav--responsive");
    } else {
        buttonMobile.classList.add("mobile__button--active");
        navMenuMobile.classList.add("nav--responsive");
    }
});

