import React, { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

// Definindo os tipos para o componente
interface ImageCropperProps {
  image: string
  onCropDone: (croppedArea: Area | null) => void
  onCropCancel: () => void
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCropDone,
  onCropCancel,
}) => {
  // Define state variables
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<Area | null>(null)
  const aspectRatio = 1 / 1

  // Callback when cropping is completed
  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    // Store the cropped area in pixels
    setCroppedArea(croppedAreaPixels)
  }

  return (
    <div className="cropper">
      <div>
        {/* Image Cropper component */}
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: '100%',
              height: '80%',
              backgroundColor: '#fff',
            },
          }}
        />
      </div>

      <div className="action-btns">
        {/* Buttons for canceling or applying the crop */}
        <div className="btn-container">
          <button className="btn btn-outline" onClick={onCropCancel}>
            Cancel
          </button>

          <button
            className="btn"
            onClick={() => {
              onCropDone(croppedArea)
            }}
          >
            Crop & Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageCropper
