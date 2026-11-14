// Set to the BrainSense inbox before going live; the form opens the visitor's mail client.
const CONTACT_EMAIL = "";

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
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = document.getElementById("form-status");
    const data = new FormData(form);
    if (!CONTACT_EMAIL) {
      status.textContent = "Het contactformulier is nog niet gekoppeld. Gebruik voorlopig de gegevens hiernaast.";
      return;
    }
    const subject = `Aanvraag: ${data.get("onderwerp")} - ${data.get("naam")}`;
    const body = [
      `Naam: ${data.get("naam")}`,
      `E-mail: ${data.get("email")}`,
      `Organisatie: ${data.get("organisatie") || "-"}`,
      `Onderwerp: ${data.get("onderwerp")}`,
      "",
      data.get("bericht"),
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Je e-mailprogramma wordt geopend om het bericht te versturen.";
  });
}
