import { Loader2 } from "lucide-react"

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <Loader2 className="animate-spin"/>
    </div>
  )
}

export default Loader;