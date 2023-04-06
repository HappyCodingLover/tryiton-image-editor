import { trpc } from "@/utils/trpc";
import { useState } from "react"
import EditImage from "./editImg";
// import { GetServerSideProps } from 'next'

interface CustomModalProps {
  url: string
  type: boolean
  id: number
  init: () => void
}

const CustomModal = ({ url, type, id, init }: CustomModalProps) => {

  const [wanted, setWanted] = useState<string>("");

  const mutation = trpc.saveEditRequest.useMutation();

  const saveRequest = async () => {
    try {
      mutation.mutate({ url: url, request: wanted });
    } catch (error) {
      console.error(`Save Edit Request Error: ${error}`);
    }
    init();
  }



  return (
    <div className="h-screen w-screen absolute bg-dark top-0 left-0 backdrop-blur-sm flex flex-col items-center justify-center">
      {type ?
        // <div className="bg-white flex flex-col rounded-lg shadow-2x1 border-black">
        //   {/* <img src={url} alt="IMG" width={350} /> */}
        //   <canvas id="canvas" width={300} />
        //   <button onClick={editImg} className="bg-amber-300 p-2.5 font-semibold">SAVE</button>
        // </div>:
        <EditImage url={url} init={init} id={id} /> :
        <div className="bg-white p-5 flex flex-col rounded-lg shadow-2xl">
          <div className="flex flex-col items-start">
            <label htmlFor="wanted">What do you want to be edited?</label>
            <textarea id="wanted" className="border border-black w-full" value={wanted} onChange={(e) => setWanted(e.target.value)} />
          </div>
          <button onClick={saveRequest} className="bg-amber-300 mt-2">SAVE</button>
        </div>}
    </div>
  )
}

export default CustomModal