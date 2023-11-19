import { Loader2 } from "lucide-react"

export const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <Loader2 className="animate-spin"/>
    </div>
  )
}