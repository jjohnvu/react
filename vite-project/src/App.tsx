import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import WordDocumentButton from './WordDocumentButton';

const App: React.FC = () => {
  return (
    <div>
      <h1>React App with Google Login and Word Document Upload</h1>
      <GoogleLoginButton />
      <WordDocumentButton />
    </div>
  );
};

export default App;