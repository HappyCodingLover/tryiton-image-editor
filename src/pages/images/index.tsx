import CustomModal from "@/components/modal";
import { trpc } from "@/utils/trpc";
import React, { useEffect, useMemo, useState } from "react"
// import imgLink from "../../images.json"

const ImageComponent = () => {

  const [showEditImgModal, setShowEditImgModal] = useState<boolean>(false);
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const [editImgURL, setEditImgURL] = useState<string>("");
  const [editId, setEditId] = useState<number>(-1);
  const [requestedURL, setRequestedURL] = useState<string>("");
  const [modalType, setModalType] = useState<boolean>(false);
  const [imgLink, setImgLink] = useState<any>({});

  const query = trpc.getImage.useQuery({ get: "all" });

  useEffect(() => {
    if (query.data) {
      setImgLink(query.data)
    }
  }, [query])

  const editImg = (url:string, key: number) => {
    setEditImgURL(url);
    setEditId(key);
    setModalType(true)
    setShowEditImgModal(true);
  }
  const requestEdit = (url: string) => {
    setShowRequestModal(true);
    setRequestedURL(url);
    setModalType(false);
  }

  const init = () => {
    setShowEditImgModal(false)
    setShowRequestModal(false)
    setEditImgURL("")
    setRequestedURL("")
    setModalType(false)
  }

  const image = useMemo(() => {
    return imgLink?.original?.map((url: string, key: number) => {
      return (
        <div key={key} className="cursor-pointer border border-black rounded-md border-dotted">
          <img id={`${key}`} src={url} alt={"IMG"} width={100} className="rounded-t-md" />
          <div className="flex flex-col">
            <button className="bg-green-600 text-white text-sm" onClick={() => editImg(url, key)}>EDIT</button>
            <button className="bg-amber-300 text-black text-sm rounded-b-md" onClick={() => requestEdit(url)}>REQUEST EDIT</button>
          </div>
        </div>
      )
    })
  }, [imgLink])

  return (
    <div>
      <div className="p-2 flex flex-row flex-wrap gap-2.5 items-center">
        {image}
      </div>
      <div id="result">

      </div>
      {showRequestModal &&
        <CustomModal url={requestedURL} id={editId} type={modalType} init={init} />
      }
      {showEditImgModal &&
        <CustomModal url={editImgURL} id={editId} type={modalType} init={init} />
      }
    </div>
  )
}

export default ImageComponent