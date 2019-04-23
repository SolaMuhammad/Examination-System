var inputs = document.getElementsByTagName("input");
document.getElementsByTagName("button")[0].addEventListener("click", function (event) {
    event.preventDefault();
    //  if(!validateUserName()){
    //      alert("Please Enter valid username -> username must be more than 5 characters ");
    //     }
    //     else{
    //         if(!validateEmail()){
    //             alert("Please Enter valid username -> username must be more than 5 characters ");
    //         }
    //         else
    //         {
    //             if(!validatePassword()){
    //                 alert("Please Enter valid username -> username must be more than 5 characters ");
    //             }
    //             else{

    //                 if(!validateConfirmedPassword()){
    //                     alert("Your password and confirmed password are different");
    //                 }
    //                 else{
    //                     event.preventDefault();
    //                     window.location.href = "Exam.html";
    //                 }
    //             }
    //         }
    //     }
    if (!validateUserName()) {
        alert("Not valid user name");   
    }
    else if(!validateEmail()){
        alert("Not valid email");
    }
    else if(!validatePassword()){
        alert("Not valid password");
    }
    else if(!validateConfirmedPassword()){
        alert("Your password and confirmed password are different");
    }
    else{
        window.location.href = "Exam.html";
    }
});

/** Validation  */
function validateUserName() {
    var illegalChars = /\W/;
    if (inputs[2].value.length > 5 && !( illegalChars.test(inputs[2].value)) ){
        return true;
    }
    return false;
}
function validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(inputs[3].value).toLowerCase());
}
function validatePassword() {
    if (inputs[4].value > 8) {
        return true;
    }
    return false;
}
function validateConfirmedPassword() {
    if (inputs[4].value === inputs[5].value) {
        return true;
    }
    return false;
}