// Call functions on page load
window.addEventListener("load", () => {
    // Find the nextStep2 button and add a click event listener
    const nextStep2Button = document.querySelector("#nextStep2");
    nextStep2Button.addEventListener("click", function() {
        if (!nextStep2Button.classList.contains("unclickable") && nextStep2Button.getAttribute("data-disabled") !== "true") {
            goStep3();
        }
    });
    setButtonState('goCheckout', 'disable');
});

function goStep3 () {
    // Find the current step, old step and new step
    const gridStep1Wrapper = document.querySelector(".gridstep1wrapper");
    const gridStep2Wrapper = document.querySelector(".gridstep2wrapper");
    const gridStep3Wrapper = document.querySelector(".gridstep3wrapper");
    const flowStep2 = document.querySelector("#flowStep2");
    const flowStep3 = document.querySelector("#flowStep3");
    const resultsNextButtonStep3 = document.querySelector("#resultsNextButtonStep3");

    // Call the animateArrow1 function
    animateArrow("arrow2wrapper", "forward");
    // Hide step 1 and show step 2
    gridStep1Wrapper.style.display = "none";
    gridStep2Wrapper.style.display = "none";
    gridStep3Wrapper.style.display = "flex";
    flowStep2.classList.remove("active");
    flowStep2.classList.add("complete");
    flowStep3.classList.add("active");

    // Show resultsNextButtonStep3 row
    resultsNextButtonStep3.classList.remove("hidden");

    // Remove "active" class and add "complete" class to children and grandchildren of flowStep1
    Array.from(flowStep2.children).forEach(child => {
        child.classList.remove("active");
        child.classList.add("complete");
        Array.from(child.children).forEach(grandchild => {
            grandchild.classList.remove("active");
            grandchild.classList.add("complete");
        });
    });

    // Add "active" class to children and grandchildren of flowStep2
    Array.from(flowStep3.children).forEach(child => {
        child.classList.add("active");
        Array.from(child.children).forEach(grandchild => {
            grandchild.classList.add("active");
            grandchild.classList.remove("complete");
        });
    });

}