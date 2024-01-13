import React, { ChangeEvent, useState } from 'react';

const WordDocumentButton: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        // e.target.result contains the contents of the file as a data URL
        const fileContent = e.target?.result as string;
        console.log('File Content:', fileContent);
      };

      // Read the content of the selected file as a data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".doc, .docx"
        onChange={handleFileChange}
      />
      <button disabled={!selectedFile}>Upload Word Document</button>
    </div>
  );
};

export default WordDocumentButton;