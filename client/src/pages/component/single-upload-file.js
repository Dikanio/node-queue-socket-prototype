import { ChangeEvent, useState } from 'react';
import axios from 'axios'

function SingleUploadFile() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      return;
    }
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "images")
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    await axios
      .post("https://dev-lifechat-gateway.itmi.id/v1/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
		// handle the response
        console.log(response);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default SingleUploadFile;