import React from 'react'
import { useState, useEffect } from 'react'
import { MuiFileInput } from 'mui-file-input'
import Button from '@mui/material/Button'
import { ProgressBar } from  'react-loader-spinner'
import MainImageListComponent from './ImageList'
import axios from 'axios'
const backendUrl = 'willsfilestoragebackend.netlify.app'

const FileInput = () => {
  const [inputValue, setInputValue] = useState(null)
  const [message, setMessage] = useState(undefined)
  const [showProgress, setShowProgress] = useState(false)
  const [objects, setObjects] = useState(null)

	useEffect(() => {
		axios(`${backendUrl}/api/bucket/getallobjects`)
		.then(res => setObjects(res.data))
		.catch(e => console.log({'Error getAllObjects': e}))
	}, [])

  const handleInputChange = newValue => {
    setInputValue(newValue)
    if(inputValue === null) {
      setShowProgress(false)
    }
  }

  const handleUpload = async e => {
    e.preventDefault()
    setShowProgress(true)
    var bodyFormData = new FormData()

    if(!inputValue || inputValue.length < 1) {
      setMessage("Upload a minimum of 1 file")
      setShowProgress(false)
    } else {
      setMessage(undefined)
      inputValue.map(image => bodyFormData.append('file', image))

      try {
        const res = await axios.post(`${backendUrl}/api/bucket/upload`, bodyFormData)
        setObjects(res.data)
        setShowProgress(false)
        setInputValue(null)
        setMessage("Files Uploaded Successfully")
      } catch(e) {
        setMessage(e)
      }
    }
  }

  return(
    <>
      <div className="fileInput">
        <MuiFileInput className='fileInput' multiple value={inputValue} onChange={handleInputChange} placeholder={message} />
        <ProgressBar visible={showProgress} borderColor='#047D95' />
      </div>
      <div>
        <Button style={{backgroundColor:'#047D95'}} className='submitBtn' onClick={handleUpload} variant="contained" size="large">Upload Files</Button>
      </div>
      <div className="imageList">
        {/* placed component here to update images in component on file upload / res */}
        <MainImageListComponent objects={objects}/>
      </div>
    </>
    )
}

export default FileInput