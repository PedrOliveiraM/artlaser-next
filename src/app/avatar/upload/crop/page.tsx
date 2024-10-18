// components/ImageCrop.tsx
'use client'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
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

    return newBlob
  }

  return (
    <form onSubmit={uploadCroppedImage}>
      <label htmlFor="imageTitle">Título da Imagem</label>
      <Input type="file" accept="image/*" onChange={handleImageChange} />
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
          <Button
            variant={'secondary'}
            type="button"
            onClick={cropImage}
            className="mt-10"
          >
            Cortar Imagem
          </Button>
        </div>
      )}

      {croppedImage && showPreview && (
        <div className="relative">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-center font-semibold">Imagem cortada</h2>
            <Image
              src={croppedImage}
              alt="Cropped"
              className="mx-auto object-cover"
              width={215}
              height={215}
            />
            <Button type="button" onClick={() => setshowPreview(false)}>
              Fechar
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
