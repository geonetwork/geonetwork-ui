export function downsizeImage(
  blob: Blob,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = URL.createObjectURL(blob)
    image.onload = () => {
      let width = image.width
      let height = image.height

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = height * (maxWidth / width)
          width = maxWidth
        } else {
          width = width * (maxHeight / height)
          height = maxHeight
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, width, height)

      canvas.toBlob(resolve, blob.type)
    }
    image.onerror = reject
  })
}

export function downgradeImage(
  blob: Blob,
  maxSizeBytes: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = URL.createObjectURL(blob)
    image.onload = () => {
      const width = image.width
      const height = image.height
      let quality = 1.0

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, width, height)

      const compressAndResolveBlob = (blobToCompress: Blob) => {
        if (blobToCompress.size <= maxSizeBytes) {
          resolve(blobToCompress)
        } else {
          quality -= 0.1
          if (quality >= 0) {
            canvas.toBlob(compressAndResolveBlob, blob.type, quality)
          } else {
            reject('Unable to compress image below max size')
          }
        }
      }

      canvas.toBlob(compressAndResolveBlob, blob.type, quality)
    }
    image.onerror = reject
  })
}
