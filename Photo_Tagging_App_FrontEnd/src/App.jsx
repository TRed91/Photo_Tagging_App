import { useState } from 'react'
import Header from './components/header/header'
import './App.css'
import ImageComponent from './components/main/imageComponent'

function App() {
  const [ imageId, setImageId ] = useState(1)

  return (
    <>
    <Header imageId={imageId} />
    <ImageComponent imageId={imageId} setImageId={(id) => setImageId(id)} />
    </>
  )
}

export default App
