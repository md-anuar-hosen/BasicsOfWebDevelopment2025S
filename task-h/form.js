// Task H: Tailwind version

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

  // error nodes
  const errFullName = document.getElementById("err-fullName");
  const errEmail = document.getElementById("err-email");
  const errPhone = document.getElementById("err-phone");
  const errBirth = document.getElementById("err-birth");
  const errTerms = document.getElementById("err-terms");
  const errorSummary = document.getElementById("errorSummary");

  const setText = (el, txt) => { el.textContent = txt || ""; };
  const showSummary = (messages) => {
    if (!messages.length) {
      errorSummary.classList.add("hidden");
      errorSummary.innerHTML = "";
      return;
    }
    errorSummary.classList.remove("hidden");
    errorSummary.innerHTML =
      "<strong>Please fix the following:</strong><ul class='list-disc pl-5 mt-1'>" +
      messages.map(m => `<li>${m}</li>`).join("") +
      "</ul>";
  };

  const clearErrors = () => {
    [errFullName, errEmail, errPhone, errBirth, errTerms].forEach(e => setText(e, ""));
    showSummary([]);
  };

  const ageFrom = (dob, today) => {
    let a = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) a--;
    return a;
  };

  const validate = () => {
    clearErrors();
    const messages = [];

    // Full name: two words, letters (accepts diacritics, hyphen, apostrophe)
    const nameVal = fullName.value.trim();
    if (!nameVal) {
      setText(errFullName, "Enter your full name.");
      messages.push("Full name is required.");
    } else {
      const parts = nameVal.split(/\s+/).filter(Boolean);
      const ok = parts.length >= 2 && parts.every(w => /^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,}$/.test(w));
      if (!ok) {
        setText(errFullName, "Use first and last name (letters only).");
        messages.push("Full name must include first and last name (letters only).");
      }
    }

    // Email
    const emailVal = email.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      setText(errEmail, "Enter your email address.");
      messages.push("Email is required.");
    } else if (!emailRe.test(emailVal)) {
      setText(errEmail, "That doesn’t look like a valid email (e.g., name@example.com).");
      messages.push("Email format is invalid.");
    }

    // Phone: 7–15 digits
    const phoneVal = phone.value.trim();
    const digits = phoneVal.replace(/\D/g, "");
    if (!phoneVal) {
      setText(errPhone, "Enter your phone number.");
      messages.push("Phone number is required.");
    } else if (digits.length < 7 || digits.length > 15) {
      setText(errPhone, "Phone should have 7–15 digits (numbers only).");
      messages.push("Phone must have 7–15 digits.");
    }

    // Birth: in the past, age >= 13
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
      } else if (ageFrom(bd, today) < 13) {
        setText(errBirth, "Minimum age is 13.");
        messages.push("User must be at least 13 years old.");
      }
    }

    // Terms
    if (!terms.checked) {
      setText(errTerms, "You must accept the terms to continue.");
      messages.push("Terms must be accepted.");
    }

    showSummary(messages);
    return messages.length === 0;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    // stamp ISO now
    const now = new Date();
    ts.value = now.toISOString();

    // append row
    const tr = document.createElement("tr");
    tr.className = "odd:bg-white even:bg-slate-50";

    const td = (txt) => {
      const c = document.createElement("td");
      c.className = "px-3 py-2 border-b border-slate-200";
      c.textContent = txt;
      return c;
    };

    tr.append(
      td(fullName.value.trim()),
      td(email.value.trim()),
      td(phone.value.trim()),
      td(birth.value),
      td(now.toLocaleString())
    );

    tableBody.appendChild(tr);

    // reset and focus
    form.reset();
    clearErrors();
    fullName.focus();
  });

  form.addEventListener("reset", () => {
    clearErrors();
    ts.value = "";
  });
});

