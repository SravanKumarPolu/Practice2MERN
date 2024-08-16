import  { useState } from 'react';
import axios from 'axios';

import './App.css'

function App() {
  const [count, setCount] = useState(0)const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', file);

      try {
          const response = await axios.post('/upload', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              onUploadProgress: (progressEvent) => {
                  console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total));
              },
          });
          console.log(response.data);
      } catch (error) {
          console.error('Error uploading file:', error);
      }
  };
  return (
    <>
         <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    </>
  )
}

export default App
