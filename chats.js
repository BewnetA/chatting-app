document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector(".menu");
    const optionBar = document.querySelector(".option-bar");

    menuIcon.addEventListener("click", function() {
        optionBar.classList.toggle("active");
    });
});
