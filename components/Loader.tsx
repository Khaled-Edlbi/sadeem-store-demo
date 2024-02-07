import { LoaderProps } from "@/types"


function Loader(
  { width, height, borderWidth='border-[3px]', borderColor='border-milk' }
  : LoaderProps) {
  return (
    <div className={`${width} ${height} ${borderWidth}
      border-solid border-y-transparent ${borderColor}
      inline-block rounded-full animate-rot5`}
    ></div>
  )
}

export default Loader