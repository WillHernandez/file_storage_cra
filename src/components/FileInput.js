import React from 'react'
import { MuiFileInput } from 'mui-file-input'
import Button from '@mui/material/Button'
import axios from 'axios'
const url = "http://localhost:4000/api/bucket/upload"

const FileInput = () => {
  const [value, setValue] = React.useState(null)
  const [message, setMessage] = React.useState(undefined)

  const handleChange = newValue => {
    setValue(newValue)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    var bodyFormData = new FormData()

    if(!value || value.length < 1) {
      setMessage("must upload one file at minimum")
    } else {
      value.map(image => bodyFormData.append('file', image))

      try {
        await axios.post(url, bodyFormData)
        setMessage("Files uploaded to your folder successfully")
      } catch(e) {
        console.log({error: e});
      }
    }
  }

  return(
    <>
      <MuiFileInput className='fileInput' multiple value={value} onChange={handleChange} />
      <div>
        <Button style={{backgroundColor:'#047D95'}} className='submitBtn' onClick={handleSubmit} variant="contained" size="large">Upload</Button>
        {message && <h1>{message}</h1>}
      </div>
    </>
    )
}

export default FileInput