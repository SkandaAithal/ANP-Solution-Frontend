function validationForm(e) {
  let counter = 0;
  e.preventDefault();
  let nameIcon = document.querySelector(".bi-person-fill");
  let envelopIcon = document.querySelector(".bi-envelope-at-fill");
  let phoneIcon = document.querySelector(".bi-telephone-fill");
  let customerField = document.getElementById("name");
  let customerName = document.getElementById("name").value.trim().toLowerCase();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let phoneField = document.getElementById("phone");
  let emailField = document.getElementById("email");
  let labels = document.querySelectorAll(".form-label");
  let exclamations = document.querySelectorAll(".bi-exclamation-circle-fill");
  let query = document.getElementById("query").value.trim();
  let queryField = document.getElementById("query");

  // ^ name
  function names() {
    if (!customerName) {
      nameIcon.style.color = "red";
      labels[0].textContent = "Name is required";
      labels[0].style.color = "red";
      customerField.style.border = "2px solid red";
      exclamations[0].classList.remove("d-none");
      exclamations[0].style.color = "red";
      counter = 0;
      return false;
    } else if (!/^[A-Za-z\s.]+$/g.test(customerName)) {
      nameIcon.style.color = "red";
      labels[0].textContent = "Name should have only alphabets";
      labels[0].style.color = "red";
      customerField.style.border = "2px solid red";
      exclamations[0].classList.remove("d-none");
      exclamations[0].style.color = "red";
      counter = 0;
      return false;
    } else {
      nameIcon.style.color = "black";
      labels[0].textContent = "Name:";
      labels[0].style.color = "white";
      customerField.style.border = "none";
      exclamations[0].classList.add("d-none");
      counter += 1;
    }
  }
  names();

  // ^ phone number
  function phoneNumber() {
    if (!phone) {
      phoneIcon.style.color = "red";
      labels[1].textContent = "Phone number is required";
      labels[1].style.color = "red";
      phoneField.style.border = "2px solid red";
      exclamations[1].classList.remove("d-none");
      exclamations[1].style.color = "red";
      counter = 0;
      return false;
    } else if (!/^[6-9][0-9]{9}$/.test(phone)) {
      phoneIcon.style.color = "red";
      labels[1].textContent = "Only 10 numbers allowed ";
      labels[1].style.color = "red";
      phoneField.style.border = "2px solid red";
      exclamations[1].classList.remove("d-none");
      exclamations[1].style.color = "red";
      counter = 0;
      return false;
    } else {
      phoneIcon.style.color = "black";
      labels[1].textContent = "Phone:";
      labels[1].style.color = "white";
      phoneField.style.border = "none";
      exclamations[1].classList.add("d-none");
      counter += 1;
    }
  }
  phoneNumber();

  // ^ email
  function emails() {
    if (!email) {
      envelopIcon.style.color = "red";
      labels[2].textContent = "Email is required";
      labels[2].style.color = "red";
      emailField.style.border = "2px solid red";
      exclamations[2].classList.remove("d-none");
      exclamations[2].style.color = "red";
      counter = 0;
      return false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      envelopIcon.style.color = "red";
      labels[2].textContent = "Email is wrong";
      labels[2].style.color = "red";
      emailField.style.border = "2px solid red";
      exclamations[2].classList.remove("d-none");
      exclamations[2].style.color = "red";
      counter = 0;
      return false;
    } else {
      envelopIcon.style.color = "black";
      labels[2].textContent = "Email address:";
      labels[2].style.color = "white";
      emailField.style.border = "none";
      exclamations[2].classList.add("d-none");
      counter += 1;
    }
  }
  emails();

  // ^ text area
  function textarea() {
    if (query) {
      labels[3].textContent = "Your Query...";
      labels[3].style.color = "white";
      queryField.style.border = "none";
      exclamations[3].classList.add("d-none");
      counter += 1;
    } else {
      labels[3].textContent = "Field required";
      labels[3].style.color = "red";
      queryField.style.border = "2px solid red";
      exclamations[3].classList.remove("d-none");
      exclamations[3].style.color = "red";
      counter = 0;
      return false;
    }
  }
  textarea();

  // ! if validation is complete with count=4 this will execute

  if (counter == 4) {
    Swal.fire({
      position: "top",
      icon: "success",
      title: "We have recieved your Email",
      text: "We will get back to you as soon as possible",
      showConfirmButton: false,
      timer: 4500,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });

    // ^ sending email to the owner from client

    fetch("http://localhost:4500/api/mail/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: customerName,
        mobileNo: phone,
        emails: email,
        message: query,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    //^ clearing data

    customerField.value = "";
    phoneField.value = "";
    emailField.value = "";
    queryField.value = "";
  }
}
