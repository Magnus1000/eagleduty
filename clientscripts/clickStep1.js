function addRadioEventListener() {
    const radiosContainer = document.querySelector("#resultsColumn");

    radiosContainer.addEventListener("click", (event) => {
        const clickedRadio = event.target;

        if (clickedRadio.classList.contains("result-radio")) {
            const radios = radiosContainer.querySelectorAll(".result-radio");

            radios.forEach((radio) => {
                if (radio !== clickedRadio) {
                    radio.checked = false;
                    radio.classList.remove("checked");
                }
            });

            if (clickedRadio.checked) {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set("htsno", clickedRadio.value);
                window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
                clickedRadio.classList.add("checked");
            } else {
                clickedRadio.classList.remove("checked");
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
    addRadioEventListener();

    const nextStep1Button = document.querySelector("#nextStep1");
    nextStep1Button.addEventListener("click", goStep2);
});