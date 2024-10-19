'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'

interface Blob {
  pathname: string
  downloadUrl: string
  url: string
}

export default function BlobUrls() {
  const [blobImages, setBlobImages] = useState<Blob[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch images from the blob store
    const fetchBlobImages = async () => {
      try {
        const response = await fetch(`/api/avatar/upload`, {
          method: 'GET',
        })

        if (!response.ok) {
          throw new Error('Error fetching images from blob store')
        }

        const blobData = await response.json() // assuming the response is JSON

        setBlobImages(blobData) // Set the fetched images in state
        setLoading(false)
      } catch (error) {
        console.error('Error fetching images:', error)
        setError('Error fetching images from blob store')
        setLoading(false)
      }
    }

    fetchBlobImages()
  }, []) // Empty dependency array to run the effect only once on mount

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      {blobImages.length === 0 ? (
        <p>No images found</p>
      ) : (
        blobImages.map((blob) => (
          <Card key={blob.pathname}>
            <CardHeader>{blob.pathname}</CardHeader>
            <CardContent>
              <Image
                alt={blob.pathname}
                src={blob.downloadUrl}
                width={300} // Specify width
                height={300} // Specify height
              />
              <Button asChild>
                <a href={blob.url} target="_blank" rel="noopener noreferrer">
                  Ver
                </a>
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </>
  )
}
