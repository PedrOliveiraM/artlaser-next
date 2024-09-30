import { useState } from 'react'
import FileInput from './file-input'
import ImageCropper from './image-cropper'
import '../app/app.css'

// Definindo o tipo de Area, compatível com o esperado pelo ImageCropper
interface Area {
  x: number
  y: number
  width: number
  height: number
}

export default function ChooseFile() {
  // Define state variables
  const [image, setImage] = useState<string | null>('')
  const [currentPage, setCurrentPage] = useState<string>('choose-img')
  const [imgAfterCrop, setImgAfterCrop] = useState<string | null>('')

  // Callback function when an image is selected
  const onImageSelected = (selectedImg: string | ArrayBuffer | null) => {
    if (typeof selectedImg === 'string') {
      setImage(selectedImg)
      setCurrentPage('crop-img')
    }
  }

  // Callback function when cropping is done
  const onCropDone = (imgCroppedArea: Area | null) => {
    if (!imgCroppedArea) {
      console.error('Cropped area is null')
      return
    }

    // Create a canvas element to crop the image
    const canvasEle = document.createElement('canvas')
    canvasEle.width = imgCroppedArea.width
    canvasEle.height = imgCroppedArea.height

    const context = canvasEle.getContext('2d')
    if (!context) return // Check if context is available

    // Load the selected image
    const imageObj1 = new Image()
    if (image) {
      imageObj1.src = image
      imageObj1.onload = function () {
        // Draw the cropped portion of the image onto the canvas
        context.drawImage(
          imageObj1,
          imgCroppedArea.x,
          imgCroppedArea.y,
          imgCroppedArea.width,
          imgCroppedArea.height,
          0,
          0,
          imgCroppedArea.width,
          imgCroppedArea.height,
        )

        // Convert the canvas content to a data URL (JPEG format)
        const dataURL = canvasEle.toDataURL('image/jpeg')

        setImgAfterCrop(dataURL)
        setCurrentPage('img-cropped')
      }
    }
  }

  // Callback function when cropping is canceled
  const onCropCancel = () => {
    setCurrentPage('choose-img')
    setImage(null)
  }

  return (
    <div className="container">
      {currentPage === 'choose-img' ? (
        <FileInput onImageSelected={onImageSelected} />
      ) : currentPage === 'crop-img' ? (
        <ImageCropper
          image={image || ''}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : (
        // Display the cropped image and options to crop a new image or start over
        <div className="flex flex-col gap-2">
          <div>
            <img
              src={imgAfterCrop || ''}
              className="cropped-img"
              alt="Cropped"
            />
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                // Allow cropping the current image again
                setCurrentPage('crop-img')
              }}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Recortar
            </button>

            <button
              onClick={() => {
                // Start over by choosing a new image
                setCurrentPage('choose-img')
                setImage(null)
              }}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Nova Imagem
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
