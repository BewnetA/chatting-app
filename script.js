document.addEventListener("DOMContentLoaded", () => {
    function setupSelection(groupSelector, inputId) {
        const buttons = document.querySelectorAll(groupSelector);
        const inputField = document.getElementById(inputId);
        
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("selected");
                let selectedValues = [...document.querySelectorAll(`${groupSelector}.selected`)]
                    .map(btn => btn.getAttribute("data-value"));
                inputField.value = selectedValues.join(",");
            });
        });
    }

    setupSelection(".multi-select", "interests");
    setupSelection(".multi-select", "match-preference");
    setupSelection(".multi-select", "relationship-type");

    document.querySelectorAll(".select-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.getElementById("gender").value = button.getAttribute("data-value");
            document.querySelectorAll(".select-btn").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
        });
    });
});
