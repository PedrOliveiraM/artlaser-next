import React, { useRef } from 'react'

// Definindo o tipo para o componente
interface FileInputProps {
  onImageSelected: (imageData: string | ArrayBuffer | null) => void
}

const FileInput: React.FC<FileInputProps> = ({ onImageSelected }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Handle the change event when a file is selected
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        onImageSelected(reader.result) // reader.result é string ou ArrayBuffer
      }
    }
  }

  const onChooseImg = () => {
    inputRef.current?.click()
  }

  return (
    <div>
      {/* Hidden file input element */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: 'none' }}
      />

      {/* Button to trigger the file input dialog */}
      <button className="btn" onClick={onChooseImg}>
        Choose Image
      </button>
    </div>
  )
}

export default FileInput
