// ________ Form section _________________

const nameField = document.getElementById("name-field");
const jobField = document.getElementById("job-role-field");
const targetCompanyField = document.getElementById("target-company-field");
const skillsArea = document.getElementById("skills");
const generateBtn = document.getElementById("generate-btn");

// ________ Output section _________________

const coverLetter = document.getElementById("cover-letter-output");
const copyBtn = document.getElementById("copy-btn");


generateBtn.addEventListener("click", () => {
    generateCoverLetter();
})

function generateCoverLetter() {

    const company = targetCompanyField.value;
    const name = nameField.value;
    const role = jobField.value;
    const skills = skillsArea.value;
    
    const letter = `
        Dear Hiring Manager at ${company},

        My name is ${name} and I am excited to apply for the ${role} role.

        My key skills include ${skills}.

        Thank you for your consideration.

        Sincerely,
        ${name}
        `;

        coverLetter.value = letter;
}