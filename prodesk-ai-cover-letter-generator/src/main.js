import "./style.css";
import { GoogleGenerativeAI }
from "@google/generative-ai";

// _____________Gemini________________________

const genAI =
    new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
    );

    const model =
    genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
    });



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

async function generateCoverLetter() {

    console.log(import.meta.env.VITE_GEMINI_API_KEY);

    const company = targetCompanyField.value;
    const name = nameField.value;
    const role = jobField.value;
    const skills = skillsArea.value;
    
        if (
        !name ||
        !role ||
        !company ||
        !skills
    ) {

        alert("Please fill all fields");

        return;
    }

    const prompt = `
    You are a professional cover letter writer.

    Write a complete cover letter using the information below.

    Candidate Name: ${name}
    Job Role: ${role}
    Target Company: ${company}
    Skills: ${skills}

    Requirements:
    - Return ONLY the cover letter.
    - Do NOT include explanations, notes, placeholders, instructions, or bullet points.
    - Do NOT ask the user to fill in missing information.
    - Assume the provided information is correct.
    - Use a professional tone.
    - Maximum 300 words.
    `;

      try {
        generateBtn.textContent = "Generating...";
      
        const result = await model.generateContent(prompt);
      
        const response = await result.response;
      
        const text = await response.text();
      
        generateBtn.textContent = "Generate Cover Letter";
      
        coverLetter.value = text;
      } catch (error) {

        console.error(error);
        
        alert(
            "Failed to generate cover letter"
        );

        generateBtn.textContent = "Generate Cover Letter";
      }


        autoResizeTextArea();
}


copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(
        coverLetter.value
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {

        copyBtn.textContent =
            "Copy to Clipboard";

    }, 2000);
});


function autoResizeTextArea() {
    
    coverLetter.style.height = "auto";

    coverLetter.style.height = coverLetter.scrollHeight + "px";
}