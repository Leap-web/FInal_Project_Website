navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('href');
        window.location.href = targetPage; // Navigate to the selected page
    });
});