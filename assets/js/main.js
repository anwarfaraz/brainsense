const FORM_ENDPOINT = "https://api.web3forms.com/submit";
// Web3Forms access keys are public by design; they only allow sending to the registered inbox.
const WEB3FORMS_KEY = "cf347f3c-ae6a-4680-be42-fed6ad500121";

const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("form-status");
    const button = form.querySelector("button[type=submit]");
    const data = Object.fromEntries(new FormData(form));
    data.access_key = WEB3FORMS_KEY;
    data.subject = `BrainSense aanvraag: ${data.onderwerp} - ${data.naam}`;
    data.from_name = "BrainSense website";

    button.disabled = true;
    status.className = "form-note";
    status.textContent = "Bezig met versturen...";
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || String(result.success) !== "true") throw new Error(result.message || res.statusText);
      form.reset();
      status.className = "form-note success";
      status.textContent = "Bedankt! Je bericht is verstuurd. We nemen zo snel mogelijk contact met je op.";
    } catch {
      status.className = "form-note error";
      status.textContent = "Versturen is mislukt. Probeer het later opnieuw.";
    } finally {
      button.disabled = false;
    }
  });
}
