// ── EMAILJS SETUP ──
const EMAILJS_PUBLIC_KEY  = "oayOaqUy-Bc9dLJK9";
const EMAILJS_SERVICE_ID  = "service_ss2kkh3";
const EMAILJS_TEMPLATE_ID = "service_ss2kkh3";

emailjs.init(EMAILJS_PUBLIC_KEY);

// ── ELEMENTS ──
const form        = document.getElementById("contact-form");
const btnText     = document.getElementById("btn-text");
const submitBtn   = document.getElementById("submit-btn");
const status      = document.getElementById("form-status");
const successCard = document.getElementById("success-card");

// ── VALIDATION ──
function validate() {
  let valid = true;

  const name    = document.getElementById("from_name");
  const subject = document.getElementById("subject");
  const email   = document.getElementById("reply_to");
  const message = document.getElementById("message");

  [name, email, subject, message].forEach(el => el.classList.remove("invalid"));
  ["error-name", "error-email", "error-subject", "error-message"].forEach(id => {
    document.getElementById(id).textContent = "";
  });

  if (!subject.value.trim()) {
    subject.classList.add("invalid");
    document.getElementById("error-subject").textContent = "Subject is required.";
    valid = false;
  }

  if (!name.value.trim()) {
    name.classList.add("invalid");
    document.getElementById("error-name").textContent = "Name is required.";
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailPattern.test(email.value)) {
    email.classList.add("invalid");
    document.getElementById("error-email").textContent = "A valid email is required.";
    valid = false;
  }

  if (!message.value.trim() || message.value.trim().length < 10) {
    message.classList.add("invalid");
    document.getElementById("error-message").textContent = "Message must be at least 10 characters.";
    valid = false;
  }

  return valid;
}

// ── SUBMIT ──
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (!validate()) return;

  submitBtn.disabled = true;
  btnText.textContent = "Sending...";
  status.textContent = "";
  status.className = "form-status";

  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

    // Hide the form, show success card
    form.style.display = "none";
    successCard.classList.add("visible");
    successCard.scrollIntoView({ behavior: "smooth", block: "center" });

  } catch (err) {
    status.textContent = "Something went wrong. Try emailing me directly at ashlee.hart104@gmail.com";
    status.classList.add("error");
    submitBtn.disabled = false;
    btnText.textContent = "Send Message ↗";
  }
});