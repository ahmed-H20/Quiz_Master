const email = document.getElementById("cEmail");
const password = document.getElementById("Cpassword");
const toggleIcon3 = document.getElementById("toggleIcon3");
const warning = document.getElementById("toast-warning2");
const text = document.getElementById("text2");

function closebtn() {
  warning.classList.add("hidden");
}

function showtoast(message) {
  warning.classList.remove("hidden");
  text.innerHTML = message;
  setTimeout(() => {
    closebtn();
  }, 2500);
}

function togglePassword3() {
    if (password.type === "password") {
      password.type = "text";
      toggleIcon3.classList.remove("fa-eye-slash");
      toggleIcon3.classList.add("fa-eye");
  
      setTimeout(() => {
        password.type = "password"; // Hide repassword again
        toggleIcon3.classList.remove("fa-eye");
        toggleIcon3.classList.add("fa-eye-slash");
      }, 2000);
    } else {
      password.type = "password";
      toggleIcon3.classList.remove("fa-eye");
      toggleIcon3.classList.add("fa-eye-slash");
    }
  }
  


// function validateEmail(email) {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Simple regex to validate email format
//     return re.test(String(email).toLowerCase());
// }



function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showtoast("Email must be not empty....");
    return false;
  }
  if (!emailRegex.test(email)) {
    showtoast("Please enter a valid email address.");
    return false;
  }
  return true;
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password && password.length < 5) {
    showtoast("Password must be at least 5 characters long.");
    return false;
  }
  if (!passwordRegex.test(password)) {
    showtoast(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character..."
    );
    return false;
  }
  return true;
}


async function fetchUserByEmail(email) {
  try {
      let response = await fetch(`http://localhost:8080/user/by-email?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      let user = await response.json();
      return user;

  } catch (error) {
      console.error('Error fetching user by email:', error);
  }
}



async function login() {

    
  // Validate email and password format
  if (!validateEmail(email.value.trim())) return;
  if (!validatePassword(password.value.trim())) return;

  // Prepare the form data
  // let form = new FormData();
  // form.append("email", email.value.trim());
  // form.append("password", password.value.trim());

  try {

    // console.log(email.value);
    
    
    // Send login request to the server
    let response = await fetch("http://localhost:8080/user/login",{
        method:"POST",
        headers: {     
          "Content-Type": "application/json"   
          },
        body: JSON.stringify({ email: email.value.trim(), password: password.value.trim() })
      })

      let data = await response.json();
      console.log(data);
      localStorage.setItem('authToken', data);

    // If login is successful
    if (response.ok ) {  
      
      let user = await fetchUserByEmail(email.value.trim());

            if (user) {
                localStorage.setItem('firstName', user.firstName);
                localStorage.setItem('lastName', user.lastName);
                localStorage.setItem('image', user.image);
                localStorage.setItem('email', user.email);

                if (user.role === 'admin') {
                  window.location.href = "./manageQuestion.html"; // Redirect admin to ManageQuestion
                } else {
                  window.location.href = "./LandingPage2.html"; // Redirect other users
                }   
            }
    }else{
            // Handle error message from the backend
            showtoast(
                "The email address and password combination entered do not match any account. Please try again..."
            );
    }
    
  } catch (error) {
    console.error("Error during login:", error);
    showtoast("An error occurred during login.");
  }
}












// async function login() {
//   // Validate email and password format
//   if (!validateEmail(email.value.trim())) return;
//   if (!validatePassword(password.value.trim())) return;

//   try {
//       let response = await fetch("http://localhost:8080/user/login", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email: email.value.trim(), password: password.value.trim() }),
//       });

//       // Parse the JSON response
//       let data = await response.json();
//       console.log('Response Data:', data); // Check the full response object

//       if (response.ok) {
//               console.log('Token:', data.token); // Should display the token now
//               localStorage.setItem("authToken", data.token);
//               alert(`Token: ${data.token}`); // Display token for confirmation

//               // Proceed with fetching user details and redirecting
//               let user = await fetchUserByEmail(email.value.trim());
//               if (user) {
//                   localStorage.setItem("firstName", user.firstName);
//                   localStorage.setItem("lastName", user.lastName);
//                   localStorage.setItem("image", user.image);
//                   localStorage.setItem("email", user.email);

//                   if (user.role === "admin") {
//                       window.location.href = "./manageQuestion.html";
//                   } else {
//                       window.location.href = "./LandingPage2.html";
//                   }
//               }
//       } else {
//           console.error('Login failed:', data.error); // Log the error message
//           showtoast(data.error || "An unknown error occurred.");
//       }
//   } catch (error) {
//       console.error("Error during login:", error);
//       showtoast("An error occurred during login.");
//   }
// }
















