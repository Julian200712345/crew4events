const WHATSAPP_NUMBER = "31633924962";

const directText = [
  "Hoi Crew4Events! 👋",
  "",
  "Ik wil me graag aanmelden om bij jullie te werken."
].join("\n");

document.querySelectorAll("[data-direct-whatsapp]").forEach((link) => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(directText)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

const form = document.querySelector("#crew-form");
const birthDate = document.querySelector("#birthDate");
const availabilityGroup = document.querySelector("#availability-group");
const availabilityError = document.querySelector("#availability-error");
const status = document.querySelector("#form-status");

birthDate.max = new Date().toISOString().split("T")[0];
birthDate.min = "1940-01-01";

function getValues(formData, name) {
  return formData.getAll(name).map((value) => String(value).trim()).filter(Boolean);
}

function validateAvailability() {
  const count = form.querySelectorAll('input[name="availability"]:checked').length;
  const valid = count > 0;
  availabilityGroup.classList.toggle("has-error", !valid);
  availabilityError.textContent = valid ? "" : "Kies minimaal één moment.";
  return valid;
}

form.addEventListener("change", (event) => {
  if (event.target.name === "availability") validateAvailability();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "";

  const availabilityValid = validateAvailability();
  if (!form.checkValidity() || !availabilityValid) {
    form.reportValidity();
    if (!availabilityValid) availabilityGroup.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const data = new FormData(form);
  const availability = getValues(data, "availability").join(", ");
  const experienceDetails = String(data.get("experienceDetails") || "").trim();

  const message = [
    "Hoi Crew4Events! 👋",
    "",
    "Ik wil me graag aanmelden om bij jullie te werken.",
    "",
    `*Naam:* ${data.get("firstName")} ${data.get("lastName")}`,
    `*Geboortedatum:* ${data.get("birthDate")}`,
    `*Woonplaats + postcode:* ${data.get("location")}`,
    `*E-mail:* ${data.get("email")}`,
    `*Telefoon:* ${data.get("phone")}`,
    "",
    `*Opleiding / school:* ${data.get("education")}`,
    `*Ervaringsniveau:* ${data.get("experienceLevel")}`,
    `*Ervaring / certificaten:* ${experienceDetails || "Niet ingevuld"}`,
    `*Beschikbaarheid:* ${availability}`,
    `*Vervoer:* ${data.get("transport")}`,
    "",
    "Aanmelding via app.crew4events.nl"
  ].join("\n");

  status.textContent = "WhatsApp wordt geopend met je gegevens…";
  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
});
