import React, { useState } from 'react'
import axios from "axios";
export default function Form() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('jobDescription', jobDescription);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data); // result from Gemini API
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">ATS Score Application</h1>
      
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Resume (PDF)
        </label>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer mb-4"
        />

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
          value={jobDescription}
          onChange={handleJobDescriptionChange}
          placeholder="Enter the job description..."
        />

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
          disabled={loading || !selectedFile || !jobDescription}
        >
          {loading ? 'Processing...' : 'Upload and Process'}
        </button>
      </div>

      {/* {result && (
        <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">ATS Score Results</h2>
          <pre className="bg-gray-100 p-4 rounded-lg">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )} */}


{result && (
  <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4">ATS Score Results</h2>

    <div className="mb-4">
      <strong>Percentage Match:</strong> {result.percentageMatch || 'N/A'}
    </div>

    <div className="mb-4">
      <strong>Matching Keywords:</strong>
      <ul className="list-disc ml-5">
        {result.matchingKeywords?.split(',').map((keyword, index) => (
          <li key={index}>{keyword}</li>
        )) || 'N/A'}
      </ul>
    </div>

    <div className="mb-4">
      <strong>Missing Keywords:</strong>
      <ul className="list-disc ml-5">
        {result.missingKeywords?.split(',').map((keyword, index) => (
          <li key={index}>{keyword}</li>
        )) || 'N/A'}
      </ul>
    </div>

    <div className="mb-4">
      <strong>Specific Changes to Improve Match:</strong>
      <ul className="list-disc ml-5">
        {result.specificChanges?.split(',').map((change, index) => (
          <li key={index}>{change}</li>
        )) || 'N/A'}
      </ul>
    </div>

    <div className="mb-4">
      <strong>Final Thoughts:</strong>
      <p>{result.finalThoughts || 'N/A'}</p>
    </div>
  </div>
)}


    </div>
  )
}
