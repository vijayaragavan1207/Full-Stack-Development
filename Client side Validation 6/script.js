document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const formContainer = document.getElementById('formContainer');
    const successContainer = document.getElementById('successContainer');
    const resetBtn = document.getElementById('resetBtn');

    // Fields
    const fullNameEl = document.getElementById('fullName');
    const dobEl = document.getElementById('dob');
    const genderEl = document.getElementById('gender');
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    const confirmPasswordEl = document.getElementById('confirmPassword');
    const addressEl = document.getElementById('address');
    const termsEl = document.getElementById('terms');
    const privacyEl = document.getElementById('privacy');

    // Utility: Show Error
    const showError = (input, message) => {
        const inputField = input.closest('.input-field') || input.closest('.checkbox-item');
        const errorDisplay = inputField.querySelector('.error-message');
        
        inputField.classList.remove('success');
        inputField.classList.add('error');
        errorDisplay.textContent = message;
    };

    // Utility: Show Success
    const showSuccess = (input) => {
        const inputField = input.closest('.input-field') || input.closest('.checkbox-item');
        const errorDisplay = inputField.querySelector('.error-message');
        
        inputField.classList.remove('error');
        inputField.classList.add('success');
        errorDisplay.textContent = '';
    };

    // Validation Rules
    const isRequired = value => value === '' ? false : true;
    const isBetween = (length, min, max) => length < min || length > max ? false : true;
    
    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const isPasswordSecure = (password) => {
        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    // Validators
    const checkFullName = () => {
        let valid = false;
        const fullName = fullNameEl.value.trim();
        if (!isRequired(fullName)) {
            showError(fullNameEl, 'Full Name cannot be blank.');
        } else if (!isBetween(fullName.length, 3, 50)) {
            showError(fullNameEl, 'Name must be between 3 and 50 characters.');
        } else {
            showSuccess(fullNameEl);
            valid = true;
        }
        return valid;
    };

    const checkDob = () => {
        let valid = false;
        const dob = dobEl.value;
        if (!isRequired(dob)) {
            showError(dobEl, 'Date of Birth is required.');
        } else {
            const birthDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                showError(dobEl, 'You must be at least 18 years old.');
            } else {
                showSuccess(dobEl);
                valid = true;
            }
        }
        return valid;
    };

    const checkGender = () => {
        let valid = false;
        const gender = genderEl.value;
        if (!isRequired(gender)) {
            showError(genderEl, 'Please select your gender.');
        } else {
            showSuccess(genderEl);
            valid = true;
        }
        return valid;
    };

    const checkEmail = () => {
        let valid = false;
        const email = emailEl.value.trim();
        if (!isRequired(email)) {
            showError(emailEl, 'Email cannot be blank.');
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Email is not valid.');
        } else {
            showSuccess(emailEl);
            valid = true;
        }
        return valid;
    };

    const checkPassword = () => {
        let valid = false;
        const password = passwordEl.value.trim();
        if (!isRequired(password)) {
            showError(passwordEl, 'Password cannot be blank.');
        } else if (!isPasswordSecure(password)) {
            showError(passwordEl, 'Password must have 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char.');
        } else {
            showSuccess(passwordEl);
            valid = true;
        }
        return valid;
    };

    const checkConfirmPassword = () => {
        let valid = false;
        const confirmPassword = confirmPasswordEl.value.trim();
        const password = passwordEl.value.trim();

        if (!isRequired(confirmPassword)) {
            showError(confirmPasswordEl, 'Please confirm the password.');
        } else if (password !== confirmPassword) {
            showError(confirmPasswordEl, 'Passwords do not match.');
        } else {
            showSuccess(confirmPasswordEl);
            valid = true;
        }
        return valid;
    };

    const checkAddress = () => {
        let valid = false;
        const address = addressEl.value.trim();
        if (!isRequired(address)) {
            showError(addressEl, 'Address cannot be blank.');
        } else if (address.length < 10) {
            showError(addressEl, 'Address must be at least 10 characters long.');
        } else {
            showSuccess(addressEl);
            valid = true;
        }
        return valid;
    };

    const checkTerms = () => {
        let valid = false;
        if (!termsEl.checked) {
            showError(termsEl, 'You must agree to the Terms & Conditions.');
        } else {
            showSuccess(termsEl);
            valid = true;
        }
        return valid;
    };

    const checkPrivacy = () => {
        let valid = false;
        if (!privacyEl.checked) {
            showError(privacyEl, 'You must accept the Privacy Policy.');
        } else {
            showSuccess(privacyEl);
            valid = true;
        }
        return valid;
    };

    // Event Listeners for Real-time Feedback
    const setupRealTimeValidation = () => {
        form.addEventListener('input', (e) => {
            switch (e.target.id) {
                case 'fullName': checkFullName(); break;
                case 'dob': checkDob(); break;
                case 'gender': checkGender(); break;
                case 'email': checkEmail(); break;
                case 'password': 
                    checkPassword(); 
                    if(confirmPasswordEl.value) checkConfirmPassword();
                    break;
                case 'confirmPassword': checkConfirmPassword(); break;
                case 'address': checkAddress(); break;
                case 'terms': checkTerms(); break;
                case 'privacy': checkPrivacy(); break;
            }
        });
        
        // Handling blur for fields that don't trigger input on first native click away
        form.addEventListener('focusout', (e) => {
            switch (e.target.id) {
                case 'fullName': checkFullName(); break;
                case 'dob': checkDob(); break;
                case 'gender': checkGender(); break;
                case 'email': checkEmail(); break;
                case 'password': checkPassword(); break;
                case 'confirmPassword': checkConfirmPassword(); break;
                case 'address': checkAddress(); break;
            }
        });
    };

    setupRealTimeValidation();

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        let isFullNameValid = checkFullName(),
            isDobValid = checkDob(),
            isGenderValid = checkGender(),
            isEmailValid = checkEmail(),
            isPasswordValid = checkPassword(),
            isConfirmPasswordValid = checkConfirmPassword(),
            isAddressValid = checkAddress(),
            isTermsValid = checkTerms(),
            isPrivacyValid = checkPrivacy();

        let isFormValid = isFullNameValid &&
            isDobValid &&
            isGenderValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            isAddressValid &&
            isTermsValid &&
            isPrivacyValid;

        if (isFormValid) {
            // Success State Transition
            formContainer.classList.add('hidden');
            setTimeout(() => {
                successContainer.classList.add('visible');
            }, 300); // Wait for fade out
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.input-field.error, .checkbox-item.error');
            if(firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Reset Flow
    resetBtn.addEventListener('click', () => {
        form.reset();
        
        // Remove success/error classes from all fields
        document.querySelectorAll('.input-field, .checkbox-item').forEach(el => {
            el.classList.remove('success', 'error');
            const errorMsg = el.querySelector('.error-message');
            if(errorMsg) errorMsg.textContent = '';
        });

        successContainer.classList.remove('visible');
        setTimeout(() => {
            formContainer.classList.remove('hidden');
            // Scroll back to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    });
});
