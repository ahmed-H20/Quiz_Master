const signup = document.getElementById("signup");
const check1 = document.getElementById("check1");
const check2 = document.getElementById("check2");
const check3 = document.getElementById("check3");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const userform = document.getElementById("userform");
const emailform = document.getElementById("emailform");
const passwordform = document.getElementById("passwordform");
const previous = document.getElementById("Previousbtn");
const nextbtn = document.getElementById("nextbtn");
const newcheck1 = document.getElementById("newcheck1");
const newcheck2 = document.getElementById("newcheck2");
const newcheck3 = document.getElementById("newcheck3");
const submitbtn1 = document.getElementById("submitbtn1");
const submit1 = document.getElementById("submit1");
const submit2 = document.getElementById("submit2");
let userfInput = document.querySelector("[id='fname']");
let userlInput = document.querySelector("[id='lname']");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const image = document.getElementById("image");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");
const warning = document.getElementById("toast-warning");
const text = document.getElementById("text");
const toggleIcon1 = document.getElementById("toggleIcon1");
const toggleIcon2 = document.getElementById("toggleIcon2");
// const togglePassword = new HSTogglePassword(document.querySelector('#hs-toggle-password'));
let currentStep = 1;

function closebtn(){
    warning.classList.add('hidden')
}

function showtoast(message){
    warning.classList.remove('hidden')
    text.innerHTML=message
    setTimeout(() => {
        closebtn()
    }, 2500);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Simple regex to validate email format
    return re.test(String(email).toLowerCase());
}

async function checkEmailUnique(email) {
    try {
        const response = await fetch('http://localhost:8080/user/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        return data.isUnique;
    } catch (error) {
        console.error('Error checking email uniqueness:', error);
        showtoast('Error checking email uniqueness.');
        return false;
    }
}



submitbtn1.addEventListener('click', async function(event){
                    
    event.preventDefault();

    const minLength = 5;
    const passwordValue = password.value.trim();  
    const repasswordValue = repassword.value.trim();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check minimum length
    if (passwordValue.length < minLength) {
        showtoast('Password must be at least ${minLength} characters long.');
        return ;
        // console.log('bbb');  
        // submit2.classList.add('hidden');
        // submit1.classList.remove('hidden');    
    }

    // Check for required characters: at least one uppercase, one lowercase, one number, and one special character
    if (!passwordRegex.test(passwordValue)) {
        showtoast("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.");
        return ;
    //     // console.log('accc');
    }

    // Check if passwords match
    if (passwordValue !== repasswordValue) {
        showtoast("Passwords do not match.");
        // console.log(passwordValue , repasswordValue);
        return ;
    }
    

        

        try {

            let formData = new FormData();
            formData.append('firstName', fname.value);
            formData.append('lastName', lname.value);
            formData.append('email', email.value);
            formData.append('image', image.files[0]);
            formData.append('password', password.value);
            formData.append('repassword', repassword.value);


            let response = await fetch("http://localhost:8080/user/register", {
                method: 'POST',
                body: formData            
            });

            console.log(response.error);
            
            
            if (response.ok) {
                // Add console.log to verify code execution reaches here
                console.log('Registration successful...');
                window.location.replace('./Login.html');

            }else {
                const errorData = await response.text();  
                console.log('Registration failed with status:', response.status, errorData);
                showtoast("An error occurred during registration.");
            }
        } catch (error) {
            console.error('Error during registration:', error);
            showtoast("An error occurred during registration.");
        }



});


// async function register(){

//     // s.preventDefault();

//     const minLength = 5;
//     const passwordValue = password.value;
//     const repasswordValue = repassword.value;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    
//     if (passwordValue.length < minLength) {
//         showtoast(`Password must be at least ${minLength} characters long.`);
//         // submit2.classList.add('hidden');
//         // submit1.classList.remove('hidden');
//         return ;
//         // console.log('bbb');      
//     }

//     // Check for required characters: at least one uppercase, one lowercase, one number, and one special character
//     if (!passwordRegex.test(passwordValue)) {
//         showtoast("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.");
//         return ;
//         // console.log('accc');
//     }

//     // Check if passwords match
//     if (passwordValue !== repasswordValue) {
//         showtoast("Passwords do not match.");
//         // console.log(passwordValue , repasswordValue);
//         return ;
//     }
    
        
//         let form = new FormData();
//         form.append("firstName", fname.value.trim());
//         form.append("lastName", lname.value.trim());
//         form.append("email", email.value.trim());
//         form.append("image", image.files[0]);  // This appends the image file
//         form.append("password", password.value);
//         form.append("repassword", repassword.value);
//         // body : form
//         // const obj = {firstName:fname.value,lastName:lname.value , email:email.value ,image:image.files[0],password:password.value,repassword:repassword.value }
//         // console.log(obj);   JSON.stringify(obj)
        

//         try {
//             let response = await fetch("http://localhost:8080/user/register", {
//                 headers : {"Content-Type" : "application/json"},
//                 method: 'POST',
//                 body: form
//             });

//             // body: JSON.stringify({firstName:fname.value,lastName:lname.value , email:email.value ,image:image.files[0],password:password.value,repassword:repassword.value }) 

//             console.log(response);
//             // response.status >= 201 && response.status < 300
            
//             if (response.ok) {
//                 window.location.href = './Login.html';
//             } else {
//                 showtoast( "An error occurred during registration.");
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//             showtoast("An error occurred during registration.");
//         }



// }


async function nextstep(){
    if (currentStep === 1) {
        // previous.style.transform= "translateY(" + (-100) + "px) "
        if(fname.value && fname.value.length > 2){
            if(lname.value && lname.value.length > 2){
            previous.style.display="block";
            check1.replaceWith(newcheck1);
            newcheck1.style.display="block";
            line1.style.backgroundColor="red";
            userform.replaceWith(emailform);
            emailform.style.display="block";
            localStorage.setItem("fname",fname.value)
            currentStep++;
            }else{
                showtoast("Please, enter your last name with at least 3 characters...")
                // showtoast("Please, enter your first name")
            }
        }else{
            showtoast("Please, enter your first name with at least 3 characters...")
            // showtoast("Please, enter your first name")
        }
    }

    else if (currentStep === 2) {
        if (validateEmail(email.value)) {
            
            const isUniqueEmail = await checkEmailUnique(email.value);

            if (isUniqueEmail) {
                if(image.files[0]){
        check2.replaceWith(newcheck2);
        newcheck2.style.display = "block";
        line2.style.backgroundColor = "red";
        emailform.replaceWith(passwordform);
        passwordform.style.display = "block";
        nextbtn.replaceWith(submitbtn1);
        submitbtn1.style.display = "block";
        currentStep++;
                }else {
                        showtoast("Please , Enter your image....");
                    }   
            } else {
                showtoast("This email is already registered. Please use a different email.");
            }
        }else {
            showtoast("Please enter a valid email address.");
        }
    
    // console.log(currentStep);
    
                                     
    }
}

function previousStep() {
    if (currentStep === 3) {
        // console.log(currentStep);
        newcheck2.replaceWith(check2);
        line2.style.backgroundColor = "black";
        passwordform.replaceWith(emailform);
        passwordform.style.display = "none";
        emailform.style.display = "block";
        submitbtn1.replaceWith(nextbtn);
        submitbtn1.style.display = "none";
        currentStep--; // Decrement step count
    
    }else if (currentStep === 2) {
        // console.log(currentStep);
        newcheck1.replaceWith(check1);
        line1.style.backgroundColor = "black";
        emailform.replaceWith(userform);
        emailform.style.display = "none";
        previous.style.display = "none";
        currentStep--; // Decrement step count
    }
}


function togglePassword1() {
    if (password.type === "password") {
        password.type = "text";
        toggleIcon1.classList.remove('fa-eye-slash');
        toggleIcon1.classList.add('fa-eye');

        setTimeout(() => {
            password.type = "password";  // Hide password again
            toggleIcon1.classList.remove('fa-eye');
            toggleIcon1.classList.add('fa-eye-slash');
        }, 2000);

    } else {
        password.type = "password";
        toggleIcon1.classList.remove('fa-eye');
        toggleIcon1.classList.add('fa-eye-slash');
    }
}



function togglePassword2() {
    if (repassword.type === "password") {
        repassword.type = "text";
        toggleIcon2.classList.remove('fa-eye-slash');
        toggleIcon2.classList.add('fa-eye');

        setTimeout(() => {
            repassword.type = "password";  // Hide repassword again
            toggleIcon2.classList.remove('fa-eye');
            toggleIcon2.classList.add('fa-eye-slash');
        }, 2000);

    } else {
        repassword.type = "password";
        toggleIcon2.classList.remove('fa-eye');
        toggleIcon2.classList.add('fa-eye-slash');
    }
}





// function validatePassword(password, repassword) {
//     const minLength = 5;
//     const passwordValue = password.value;
//     const repasswordValue = repassword.value;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     // Check minimum length
//     if (passwordValue.length < minLength) {
//         showtoast(`Password must be at least ${minLength} characters long.`);
//         return ;
//         // console.log('bbb');      
//     }

//     // Check for required characters: at least one uppercase, one lowercase, one number, and one special character
//     if (!passwordRegex.test(passwordValue)) {
//         showtoast("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.");
//         return ;
//         // console.log('accc');
//     }

//     // Check if passwords match
//     if (passwordValue !== repasswordValue) {
//         showtoast("Passwords do not match.");
//         console.log(passwordValue , repasswordValue);
        
//         return ;
//     }
   
// }

// const passwordValue = password.value;
// const repasswordValue = repassword.value;