import React, { ChangeEvent } from 'react';
import mammoth from 'mammoth';
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080",
  timeout: 5000,
  withCredentials: true,
});


const WordDocumentButton: React.FC<{ onSelectFile: (file: File) => void }> = ({ onSelectFile }) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    console.log('File selected:', file);

    if (file) {
      onSelectFile(file);
    
      // Serialize the file
      const wasBlob = file instanceof Blob;
      const blob = wasBlob ? file : await new Response(file).blob();
      const reader = new FileReader();
      const serializedFile = await new Promise((resolve) => {
        reader.onload = () => resolve([reader.result, blob.type, wasBlob]);
        reader.readAsDataURL(blob);
      });

      axiosInstance.post("/upload", {
        file: file,
      },{headers: {
        'Content-Type': 'multipart/form-data'
      } }).then(resp => {
        console.log(resp);
      }).catch(error => {
        console.log(error);
      });

      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;

        // Convert .docx file to HTML using mammoth.js
        const result = await mammoth.extractRawText({ arrayBuffer });
        const htmlContent = result.value;

        // Create a Blob with the HTML content
        const blob = new Blob([htmlContent], { type: 'text/html' });

        // Create a download link and trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'document.html';
        downloadLink.click();

        // Cleanup
        URL.revokeObjectURL(downloadLink.href);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileChange} />
    </div>
  );
};

export default WordDocumentButton;
