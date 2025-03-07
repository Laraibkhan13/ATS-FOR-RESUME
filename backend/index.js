const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
require('dotenv').config();
const cors = require("cors");

const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

function sanitizeText(text) {
  return text.replace(/\*\*|\*/g, '').replace(/\n/g, ' ').replace(/\s\s+/g, ' ').trim(); // Remove extra symbols and whitespace
}

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Step 1: Read the uploaded PDF
    const file = fs.readFileSync(req.file.path);

    // Step 2: Parse the PDF to extract text
    const pdfData = await pdfParse(file);
    const resumeText = pdfData.text; // Extracted text from the resume

    // (Optional) Job description from frontend
    const jobDescription = req.body.jobDescription || "Default job description here...";

    // Step 3: Prepare prompt for Gemini API
    const prompt = `
      You are an expert ATS (Applicant Tracking System) scanner. Evaluate the following resume against the provided job description:
      
      Resume: ${resumeText}
      Job Description: ${jobDescription}

      Provide the following outputs:
      - Percentage Match
      - Matching Keywords
      - Missing Keywords
      - Specific Changes to Improve Match
      - Final Thoughts

    `;

    // Step 4: Initialize Google Generative AI with API key
    const geminiAPI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // Step 5: Call the model
    const model = geminiAPI.getGenerativeModel({model:'gemini-1.5-flash'});
    const result = await model.generateContent(prompt);
    // console.log(result);
    // const evaluationParts = result.response.candidates[0].content;
    // const evaluationLines = evaluationParts.map(part => part.text.trim()).join('\n'); // Join all parts with line breaks

    // // // Step 7: Send the evaluation response back to the frontend
    // res.json({ evaluation: evaluationLines });
    // Step 6: Send the Gemini API response back to the frontend
    // res.json(result); // Adjust based on the actual response structure from the API


    const evaluationParts = result.response.candidates[0].content.parts;
      const evaluationText = evaluationParts.map(part => part.text.trim()).join('\n\n'); // Join all parts with double line breaks

    //   // Step 7: Send the evaluation response back to the frontend
      // res.json({ evaluation: evaluationText });

    const formattedEvaluation = {
        percentageMatch: evaluationText.match(/Percentage Match:\s*(.*)/)?.[1]?.trim().replace(/\*\*|\*/g, '') || 'N/A',
        matchingKeywords: evaluationText.match(/Matching Keywords:\s*([\s\S]*?)(?=\*\s*Missing Keywords:)/)?.[1]?.trim().replace(/\*\*|\*/g, '').replace(/\n/g, ' ') || 'N/A',
        missingKeywords: evaluationText.match(/Missing Keywords:\s*([\s\S]*?)(?=\*\s*Specific Changes to Improve Match:)/)?.[1]?.trim().replace(/\*\*|\*/g, '').replace(/\n/g, ' ') || 'N/A',
        specificChanges: evaluationText.match(/Specific Changes to Improve Match:\s*([\s\S]*?)(?=\*\s*Final Thoughts:)/)?.[1]?.trim().replace(/\*\*|\*/g, '').replace(/\n/g, ' ') || 'N/A',
        finalThoughts: evaluationText.match(/Final Thoughts:\s*([\s\S]*)/)?.[1]?.trim().replace(/\*\*|\*/g, '').replace(/\n/g, ' ') || 'N/A',
      };

    //   Step 8: Send the formatted evaluation response back to the frontend
      res.json(formattedEvaluation);

      // const cleanedEvaluation = sanitizeText(evaluationText);
      // res.json({ evaluation: cleanedEvaluation });

    

  } catch (error) {
    console.error('Error processing file or calling Gemini API:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
