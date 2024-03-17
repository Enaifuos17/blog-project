// * Register - display form
let registerBtn = document.getElementById("registerBtn");
let registerTitle = document.getElementById("registerTitle");
let registerForm = document.getElementById("registerForm");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("x x x ");
  registerTitle.style.display = "block";
  registerForm.style.display = "block";
});
