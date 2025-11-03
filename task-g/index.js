
// index.js
// Task G: Custom validation + append as table row

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const tableBody = document.getElementById("timetable").querySelector("tbody");
  const ts = document.getElementById("ts");

  // fields
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const birth = document.getElementById("birth");
  const terms = document.getElementById("terms");

  // error elements
  const errFullName = document.getElementById("err-fullName");
  const errEmail = document.getElementById("err-email");
  const errPhone = document.getElementById("err-phone");
  const errBirth = document.getElementById("err-birth");
  const errTerms = document.getElementById("err-terms");
  const errorSummary = document.getElementById("errorSummary");

  // helpers
  const setText = (el, txt) => { el.textContent = txt || ""; };
  const clearErrors = () => {
    [errFullName, errEmail, errPhone, errBirth, errTerms].forEach(e => setText(e, ""));
    errorSummary.hidden = true;
    errorSummary.innerHTML = "";
  };

  const validate = () => {
    clearErrors();
    const messages = [];

    // Full name: at least 2 words, letters and spaces, 3+ chars each word
    const nameVal = fullName.value.trim();
    if (!nameVal) {
      setText(errFullName, "Enter your full name.");
      messages.push("Full name is required.");
    } else {
      // require at least two words
      const parts = nameVal.split(/\s+/).filter(Boolean);
      const wordsOK = parts.length >= 2 && parts.every(w => /^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,}$/.test(w));
      if (!wordsOK) {
        setText(errFullName, "Use first and last name (letters only).");
        messages.push("Full name must include first and last name (letters only).");
      }
    }

    // Email: simple pattern
    const emailVal = email.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      setText(errEmail, "Enter your email address.");
      messages.push("Email is required.");
    } else if (!emailRe.test(emailVal)) {
      setText(errEmail, "That doesn’t look like a valid email (e.g., name@example.com).");
      messages.push("Email format is invalid.");
    }

    // Phone: digits only 7–15
    const phoneVal = phone.value.trim();
    const phoneDigits = phoneVal.replace(/\D/g, "");
    if (!phoneVal) {
      setText(errPhone, "Enter your phone number.");
      messages.push("Phone number is required.");
    } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setText(errPhone, "Phone should have 7–15 digits (numbers only).");
      messages.push("Phone must have 7–15 digits.");
    }

    // Birth date: must be in the past and age >= 13
    const birthVal = birth.value;
    if (!birthVal) {
      setText(errBirth, "Select your birth date.");
      messages.push("Birth date is required.");
    } else {
      const bd = new Date(birthVal + "T00:00:00");
      const today = new Date();
      if (isNaN(bd.getTime()) || bd >= today) {
        setText(errBirth, "Birth date must be in the past.");
        messages.push("Birth date must be in the past.");
      } else {
        // age check
        const age = ageFrom(bd, today);
        if (age < 13) {
          setText(errBirth, "Minimum age is 13.");
          messages.push("User must be at least 13 years old.");
        }
      }
    }

    // Terms
    if (!terms.checked) {
      setText(errTerms, "You must accept the terms to continue.");
      messages.push("Terms must be accepted.");
    }

    if (messages.length) {
      errorSummary.hidden = false;
      errorSummary.innerHTML =
        "<strong>Please fix the following:</strong><ul>" +
        messages.map(m => `<li>${m}</li>`).join("") +
        "</ul>";
      return false;
    }
    return true;
  };

  const ageFrom = (dob, today) => {
    let a = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) a--;
    return a;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // our validation only (no browser popups)
    if (!validate()) return;

    // stamp current time ISO (local time readable fallback too)
    const now = new Date();
    ts.value = now.toISOString();

    // append row
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = fullName.value.trim();

    const tdEmail = document.createElement("td");
    tdEmail.textContent = email.value.trim();

    const tdPhone = document.createElement("td");
    tdPhone.textContent = phone.value.trim();

    const tdBirth = document.createElement("td");
    tdBirth.textContent = birth.value; // yyyy-mm-dd

    const tdTs = document.createElement("td");
    // more user-friendly display while retaining ISO in hidden field
    tdTs.textContent = now.toLocaleString();

    tr.append(tdName, tdEmail, tdPhone, tdBirth, tdTs);
    tableBody.appendChild(tr);

    // reset form (keep summary hidden)
    form.reset();
    clearErrors();
    fullName.focus();
  });

  form.addEventListener("reset", () => {
    // Clear errors on reset
    clearErrors();
    // Clear timestamp
    ts.value = "";
  });
});
