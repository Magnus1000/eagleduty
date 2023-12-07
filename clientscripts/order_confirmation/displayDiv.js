// Hide div based on plan selected
function showPlanDiv() {
    const eagledutyPlan = localStorage.getItem('eagledutyPlan');

    if (eagledutyPlan === 'virtual_assessment') {
        const virtualAssessmentDiv = document.getElementById('virtualAssessmentDiv');
        virtualAssessmentDiv.classList.remove('hidden');
    } else if (eagledutyPlan === 'duty_ruling') {
        const dutyRulingDiv = document.getElementById('dutyRulingDiv');
        dutyRulingDiv.classList.remove('hidden');
    } else if (eagledutyPlan === 'consultation') {
        const consultationDiv = document.getElementById('consultationDiv');
        consultationDiv.classList.remove('hidden');
    }
}