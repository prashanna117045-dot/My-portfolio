const form = document.querySelector("#myForm");

const fields = {
    name: document.querySelector("#name"),
    email: document.querySelector("#email"),
    comment: document.querySelector("#comment")
};

const errors = {
    name: document.querySelector("#nameError"),
    email: document.querySelector("#emailError"),
    comment: document.querySelector("#commentError")
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(fieldName, message) {
    fields[fieldName].classList.add("invalid");
    errors[fieldName].textContent = message;
}

function clearError(fieldName) {
    fields[fieldName].classList.remove("invalid");
    errors[fieldName].textContent = "";
}

function validateField(fieldName) {
    const value = fields[fieldName].value.trim();

    if (!value) {
        showError(fieldName, "This field is required.");
        return false;
    }

    if (fieldName === "email" && !emailPattern.test(value)) {
        showError(fieldName, "Please enter a valid email address.");
        return false;
    }

    clearError(fieldName);
    return true;
}

Object.keys(fields).forEach((fieldName) => {
    fields[fieldName].addEventListener("input", () => {
        if (errors[fieldName].textContent) {
            validateField(fieldName);
        }
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fieldNames = ["name", "email", "comment"];
    const results = fieldNames.map(validateField);
    const isValid = results.every(Boolean);

    if (isValid) {
        form.reset();
        alert("Form submitted successfully!");
    }
});