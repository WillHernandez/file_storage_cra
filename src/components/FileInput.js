import React from 'react'
import { useState } from 'react'
import { MuiFileInput } from 'mui-file-input'
import Button from '@mui/material/Button'
import { ProgressBar } from  'react-loader-spinner'
import axios from 'axios'
const backendUrl = "http://localhost:4000"

const FileInput = () => {
  const [inputValue, setInputValue] = useState(null)
  const [message, setMessage] = useState(undefined)
  const [showProgress, setShowProgress] = useState(false)

  const handleInputChange = newValue => {
    setInputValue(newValue)
    // needs to stop progress bar upload action is canceled
    if(inputValue === null) {
      setShowProgress(false)
    }
  }

  const handleUpload = async e => {
    e.preventDefault()
    setShowProgress(true)
    var bodyFormData = new FormData()

    if(!inputValue || inputValue.length < 1) {
      setMessage("must upload one file at minimum")
    } else {
      inputValue.map(image => bodyFormData.append('file', image))

      try {
        await axios.post(`${backendUrl}/api/bucket/upload`, bodyFormData)
        setShowProgress(false)
        setInputValue(null)
      } catch(e) {
        setMessage(e)
      }
    }
  }

  return(
    <>
      <div className="fileInput">
        <MuiFileInput className='fileInput' multiple value={inputValue} onChange={handleInputChange} />
          {message && <p>{message}</p>}
        <ProgressBar visible={showProgress} borderColor='#047D95' />
      </div>
      <div>
        <Button style={{backgroundColor:'#047D95'}} className='submitBtn' onClick={handleUpload} variant="contained" size="large">Upload Files</Button>
      </div>
    </>
    )
}

export default FileInput