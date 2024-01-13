import React from 'react';

interface FileDisplayProps {
  selectedFile: File | null;
}

const FileDisplay: React.FC<FileDisplayProps> = ({ selectedFile }) => {
  return (
    <div>
      <h2>Selected File Details</h2>
      {selectedFile && (
        <div>
          <p>Name: {selectedFile.name}</p>
          <p>Type: {selectedFile.type}</p>
          <p>Size: {selectedFile.size} bytes</p>
        </div>
      )}
    </div>
  );
};

export default FileDisplay;