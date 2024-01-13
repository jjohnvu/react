import React, { useState, FC } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import WordDocumentButton from './WordDocumentButton';
import FileDisplay from './FileDisplay';

const App: FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div>
      <h1>React App with Google Login and Word Document Upload</h1>
      <GoogleLoginButton />
      <WordDocumentButton onSelectFile={(file) => setSelectedFile(file)} />
      <FileDisplay selectedFile={selectedFile} />
    </div>
  );
};

export default App;