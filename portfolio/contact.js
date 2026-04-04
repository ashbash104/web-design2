// ── EMAILJS SETUP ──
// Replace these three values after you set up EmailJS (instructions below)
const EMAILJS_PUBLIC_KEY  = "oayOaqUy-Bc9dLJK9";
const EMAILJS_SERVICE_ID  = "service_ss2kkh3";
const EMAILJS_TEMPLATE_ID = "template_9kr9fuy";

emailjs.init(EMAILJS_PUBLIC_KEY);

// ── FORM LOGIC ──
const form      = document.getElementById("contact-form");
const btnText   = document.getElementById("btn-text");
const submitBtn = document.getElementById("submit-btn");
const status    = document.getElementById("form-status");

function validate() {
  let valid = true;

  const name    = document.getElementById("from_name");
  const email   = document.getElementById("reply_to");
  const message = document.getElementById("message");

  // Reset
  [name, email, message].forEach(el => el.classList.remove("invalid"));
  ["error-name", "error-email", "error-message"].forEach(id => {
    document.getElementById(id).textContent = "";
  });

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

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (!validate()) return;

  submitBtn.disabled = true;
  btnText.textContent = "Sending...";
  status.textContent = "";
  status.className = "form-status";

  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
    status.textContent = "✓ Message sent! I'll be in touch soon.";
    status.classList.add("success");
    form.reset();
  } catch (err) {
    status.textContent = "Something went wrong. Try emailing me directly at ashlee.hart104@gmail.com";
    status.classList.add("error");
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = "Send Message ↗";
  }
});