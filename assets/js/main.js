// After activating FormSubmit you can replace the address with the random alias it emails you.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/amazonbuysweetvilla@gmail.com";

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
    data._subject = `BrainSense aanvraag: ${data.onderwerp} - ${data.naam}`;
    data._replyto = data.email;
    data._template = "table";

    button.disabled = true;
    status.textContent = "Bezig met versturen...";
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      status.textContent = "Bedankt! Je bericht is verstuurd. We nemen zo snel mogelijk contact met je op.";
    } catch {
      status.textContent = "Versturen is mislukt. Probeer het later opnieuw.";
    } finally {
      button.disabled = false;
    }
  });
}
