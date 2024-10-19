'use client'
import { Button } from '@/app/_components/ui/button'
import type { PutBlobResult } from '@vercel/blob'
import { useState, useRef, FormEvent } from 'react'

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)

  const uploadImageBlob = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!inputFileRef.current?.files) {
      throw new Error('No file selected')
    }

    const file = inputFileRef.current.files[0]

    const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    })

    const newBlob = (await response.json()) as PutBlobResult

    setBlob(newBlob)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="border-spacing-1 space-y-3 rounded-lg bg-slate-100 p-5 shadow-2xl">
        <h1 className="font-bold">Upload Your Avatar</h1>

        <form onSubmit={uploadImageBlob}>
          <div className="flex flex-col gap-2">
            <input name="file" ref={inputFileRef} type="file" required />
            <Button type="submit">Upload</Button>
          </div>
        </form>
        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
      </div>
    </div>
  )
}
// const deleteImageBlob = async (event: FormEvent<HTMLFormElement>) => {
//   event.preventDefault()

//   const response = await fetch(`/api/avatar/upload?url=${blobUrl}`, {
//     method: 'DELETE',
//   })

//   if (response.status === 200) {
//     alert('the image has been removed')
//   }
// }

/* <div className="border-spacing-1 space-y-3 rounded-lg bg-slate-100 p-5 shadow-2xl">
        <h1 className="font-bold">Delete Avatar</h1>
        <form onSubmit={deleteImageBlob}>
          <div className="flex flex-col gap-2">
            <label>Url blob</label>
            <Input
              onChange={(e) => setBlobUrl(e.target.value)}
              placeholder="Url para ser removida"
            />
            <Button type="submit">Remover</Button>
          </div>
        </form>
      </div>
      <BlobUrls /> */
