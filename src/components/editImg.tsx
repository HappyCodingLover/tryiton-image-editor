import axios from "axios";
import { useEffect } from "react";

interface EditImageProps {
  url: string
  id: number
  init: () => void
}

const EditImage = ({ url, id, init }: EditImageProps) => {

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D | null
  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement
    ctx = canvas?.getContext("2d");
    canvas.addEventListener("click", event => pick(event));
  })
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url
  img.addEventListener("load", () => {
    ctx?.drawImage(img, 0, 0, 300, 300);
    img.style.display = "none";
  });

  const pick = (event: MouseEvent) => {
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    const pixel = ctx?.getImageData(x, y, 10, 10);
    const data = pixel?.data
    if (data) {
      for (let i = 0; i < data?.length; i += 4) {
        data[i] = data[i] + 10;
        data[i + 1] = data[i + 1] + 10;
        data[i + 2] = data[i + 2] + 10;
      }
      ctx?.putImageData(pixel, x, y)
    }
  }

  const saveEdit = async () => {
    try {
      const imgStr = canvas.toDataURL()
      const img = document.getElementById(`${id}`) as HTMLImageElement
      img.src = imgStr
      init();
    } catch (err) {
      console.log("Edit Image Error:", err)
    }
  }

  return (
    <div className="bg-white flex flex-col rounded-lg shadow-2x1 border-black">
      <canvas id="canvas" width={300} height={300} />
      <button onClick={saveEdit} className="bg-amber-300 p-2.5 font-semibold">SAVE</button>
    </div>
  )
}

export default EditImage