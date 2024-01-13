// WordDocumentButton.tsx
import React, { ChangeEvent } from 'react';

interface WordDocumentButtonProps {
  onSelectFile: (file: File) => void;
}

const WordDocumentButton: React.FC<WordDocumentButtonProps> = ({ onSelectFile }) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    console.log('File selected:', file);
  
    if (file) {
      // Send the file to the server using the Fetch API
      const formData = new FormData();
      formData.append('wordDocument', file);
  
      try {
        const response = await fetch('http://localhost:5173/upload', {
          method: 'POST',
          body: formData,
        });
  
        // Check if the response has JSON data before attempting to parse
        if (response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error('Unexpected response format:', response);
        }
  
        // Notify the parent component about the selected file
        onSelectFile(file);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  

  return (
    <div>
      <input type="file" accept=".doc, .docx" onChange={handleFileChange} />
      <button>Upload Word Document</button>
    </div>
  );
};

export default WordDocumentButton;
