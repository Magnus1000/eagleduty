function addCheckboxEventListener() {
    const checkboxesContainer = document.querySelector("#resultsColumn");

    checkboxesContainer.addEventListener("click", (event) => {
        const clickedCheckbox = event.target;

        if (clickedCheckbox.classList.contains("result-checkbox")) {
            const checkboxes = checkboxesContainer.querySelectorAll(".result-checkbox");

            checkboxes.forEach((checkbox) => {
                if (checkbox !== clickedCheckbox) {
                    checkbox.checked = false;
                }
            });

            if (clickedCheckbox.checked) {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set("htsno", clickedCheckbox.value);
                window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
            }
        }
    });
}

function goStep2() {
    const gridStep1Wrapper = document.querySelector(".gridstep1wrapper");
    const gridStep2Wrapper = document.querySelector(".gridstep2wrapper");

    gridStep1Wrapper.style.display = "none";
    gridStep2Wrapper.style.display = "flex";
}

window.addEventListener("load", () => {
    addCheckboxEventListener();

    const nextStep1Button = document.querySelector("#nextStep1");
    nextStep1Button.addEventListener("click", goStep2);
});