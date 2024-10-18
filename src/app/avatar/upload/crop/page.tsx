// components/ImageCrop.tsx
'use client'

import { Button } from '@/app/components/ui/button'
import { PutBlobResult } from '@vercel/blob'
import 'cropperjs/dist/cropper.css'
import Image from 'next/image'
import React, { FormEvent, useRef, useState } from 'react'
import Cropper from 'react-cropper'

export default function ImageCropper() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null)

  const [image, setImage] = useState<string | null>(null) // imagem enviada pelo usuario
  const [imageName, setImageName] = useState<string>('') // imagem enviada pelo usuario
  const [croppedImage, setCroppedImage] = useState<string | null>(null) // imagem cortada
  const cropperRef = useRef<HTMLImageElement | null>(null)

  const [showPreview, setshowPreview] = useState(false)
  const [showImage, setshowImage] = useState(false)

  // recebe a imagem do usuario e salva em um state
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] // pegando a imagem
    if (!file) throw new Error('Image required') // verificando se existe
    setImageName(file.name) // guardando o nome da imagem

    console.log('Nome da imagem enviada:', imageName)
    const imageUrl = URL.createObjectURL(file) // tranformando a imagem em uma URL TEMPORARIA
    setImage(imageUrl)
    setshowImage(true)
  }

  const cropImage = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas()
      const croppedUrl = croppedCanvas.toDataURL('image/jpeg')
      setCroppedImage(croppedUrl)
      setshowPreview(true)
      setshowImage(false)
    }
  }

  const convertUrlToFile = async (
    url: string,
    fileName: string,
  ): Promise<File> => {
    const response = await fetch(url)
    const blob = await response.blob()
    return new File([blob], fileName, { type: blob.type })
  }

  const uploadCroppedImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!croppedImage) throw new Error('Cropped Image does not exist')

    const fileCropped = await convertUrlToFile(croppedImage, imageName)

    console.log('Novo arquivo:', fileCropped, blob)

    const response = await fetch(
      `/api/avatar/upload?filename=${fileCropped.name}`,
      {
        method: 'POST',
        body: fileCropped,
      },
    )

    const newBlob = (await response.json()) as PutBlobResult

    setBlob(newBlob)
  }

  return (
    <form onSubmit={uploadCroppedImage}>
      <div className="flex h-screen flex-col items-center justify-center bg-slate-100">
        <h1 className="text-xl font-bold">Envie a imagem</h1>
        {/* Input for selecting an image */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Display the image cropper only if an image is uploaded */}
        {image && showImage && (
          <div className="mt-5 flex max-w-sm flex-col justify-center">
            <Cropper
              src={image}
              className="max-h-96"
              aspectRatio={1} // Adjust to crop in a square ratio (or any ratio you want)
              guides={false}
              ref={cropperRef}
              viewMode={1}
              dragMode="move"
              cropBoxMovable={true}
              cropBoxResizable={true}
              autoCropArea={1}
              background={false}
            />
            <button type="button" onClick={cropImage} className="mt-10">
              Cortar Imagem
            </button>
          </div>
        )}

        {croppedImage && showPreview && (
          <div className="relative">
            <h2>Cropped Image Preview</h2>
            <Image
              src={croppedImage}
              alt="Cropped"
              className="object-cover"
              width={215}
              height={215}
            />
            <Button type="submit">Salvar Imagem</Button>
          </div>
        )}
      </div>
    </form>
  )
}
