document.addEventListener('DOMContentLoaded', () => {
    // Handle form submissions
    const loginForm = document.querySelector('form[action="/login"]');
    const registerForm = document.querySelector('form[action="/register"]');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // Add any client-side validation or processing here
            console.log('Login form submitted');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            // Add any client-side validation or processing here
            console.log('Registration form submitted');
        });
    }

    // Additional functionality can be added here
});