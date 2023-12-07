// Hide div based on plan selected
function showPlanDiv() {
    const eagledutyPlan = localStorage.getItem('eagledutyPlan');

    if (eagledutyPlan === 'a27265b4b3a928e9950bb0c7d580a659') {
        const virtualAssessmentDiv = document.getElementById('virtualAssessmentDiv');
        virtualAssessmentDiv.classList.remove('hidden');
    } else if (eagledutyPlan === '9fff0556c26eed38379dfe94e4b90aeb') {
        const dutyRulingDiv = document.getElementById('dutyRulingDiv');
        dutyRulingDiv.classList.remove('hidden');
    } else if (eagledutyPlan === '023d5410f566bee8336708b46f235ae7') {
        const consultationDiv = document.getElementById('consultationDiv');
        consultationDiv.classList.remove('hidden');
    }
}