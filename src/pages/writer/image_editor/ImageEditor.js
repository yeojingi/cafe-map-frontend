import React, { useCallback } from "react";
import {useDropzone} from 'react-dropzone';
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import './ImageEditor.css';
import defaultImage from "./defaultImage";
import cameraImage from "../../../image/writer_camera.png";

const ImageEditor = () => {
  const dispatch = useDispatch();
  const defaultImage = useSelector((state) => state.defaultImage);
  const cafeImage = useSelector((state) => state.image);
  const image = cafeImage
  
  // image 변할 때 마다 실행되는 부분
  const onDrop = useCallback(acceptedFiles => {
    if (!acceptedFiles[0].type.includes("image")){
      alert("이미지 파일만 넣어주세요")
      
      // !!기본 default image로 바꾸긴 했는데 이전에 올려놨던 파일을 그대로 유지하는게 좋을 지 협의 필요!
      dispatch({
        type: "IMAGE_DEFAULT",
        image: defaultImage()
      })
    }
    else{
      dispatch({
        type: "IMAGE_UPLOAD",
        image: acceptedFiles[0]
      })
      
    }
    
    // acceptedFiles.forEach((file) => {
      // 여러 파일 받을 경우 대비해서
    // })
  }, [])

  // image 파일이 아닌 경우 팅겨내기
  // const onImageAccept = (file) => {
  //   if (!file.type.includes("image")){
  //     alert("이미지 파일만 넣어주세요")
  //     dispatch({
  //       type: "IMAGE_UPLOAD",
  //       image: defaultImage()
  //     })
  //   }
  // }

  return (
    <div id="image-outer-container">
    
    <Dropzone 
      onDrop={onDrop} 
      multiple={false}>
      {({getRootProps, getInputProps}) => (
        <section>
          <div className="dropzoneDiv" {...getRootProps()}>
            <input {...getInputProps()} />
            <div id="a">
              <img id="dropzone-img" src={image}/>
              <div id="writer-camera">
              </div>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
      <div id={defaultImage ? "writer-default-camera": "writer-camera"}>
        <img id={defaultImage ? "writer-camera-default-img": "writer-camera-img"} src={cameraImage} />
      </div>
    </div>
  )
}

export default ImageEditor;