import { FileUpload } from '@/components/ui/file-upload'

export default function FileUploadDemo() {
  return (
    <FileUpload
      className="w-96"
      accept="image/*,application/pdf"
      maxFiles={5}
      description="PNG, JPG or PDF up to 10 MB"
      maxFileSize={10 * 1024 * 1024}
    />
  )
}
