import ImageEditor from "./image_editor/ImageEditor";
import UpperBar from "../components/UpperBar";
import './update.css';
import DaumPostcodeEmbed from 'react-daum-postcode';
import earth from '../../image/earth.png';
import cameraImage from "../../image/writer_camera.png";
import { useDispatch, useSelector } from "react-redux";
import { WindowSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { addCafe, addCafeWithImage, authSessionCheck } from "../../lib/axiosFetch";

import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useParams } from "react-router-dom";
import { fetchCafeList } from "../../lib/axiosFetch";
import { updateCafeImage } from "../../lib/axiosFetch";

const Updater = () => {
  const defaultImage = useSelector((state) => state.defaultImage);
  const image = useSelector((state) => state.image);
  const imageFile = useSelector((state) => state.imageFile);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  const DAUM_POST_CODE_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const { kakao } = window;

  const {id} = useParams();
  const geocoder = new kakao.maps.services.Geocoder();
  const [cafeAddress, setCafeAddress] = useState("");
  const [cafeName, setCafeName] = useState("");

  const onSubmit = () => {
    
    let formData = new FormData();
    console.log(defaultImage);
    if (defaultImage == true) {
      alert("이미지를 추가해주세요");
    } else {
      formData.append("image", imageFile);
      formData.append("id", id);
      updateCafeImage(formData).then((res) => {
        if (res.success) {
          // window.location.href = '/';
          console.log(res, defaultImage, image);
        }
      });
    } 
  }

  useEffect(() => {
    // authSessionCheck(dispatch);
    fetchCafeList()
    .then(result => {
      for (const cafe of result) {
        if (cafe.id == id) {
          setCafeAddress(cafe.address);
          setCafeName(cafe.name);
          if (cafe.thumbnail !== null) {
            dispatch({
              type: "IMAGE_DEFAULT",
              image: cafe.thumbnail
            })
          }
          console.log(cafe);
          break;
        }
      }
      
    });
  }, []);

  // 로그인 확인
  if (isLoggedIn === false) {
    alert(`로그인이 필요합니다. ${isLoggedIn}`);
    window.location.href = '/';
  }
  // 정상 로드
  else {
    return (
      <div id="outer-container">
        <UpperBar/>
        <div id="ad">
          <img src={earth} id="floating-earth"/>
        </div>
        <div id="writer-container">
          <div className="writer-modal">
            <div id="writer-upper-bar">
              <div id="writer-title" className="L-b-text">이미지 수정하기</div>
            </div>
            <div id="writer-middle-content">
              <div id="writer-cafe-info">
                <div id="writer-cafe-pic-add">
                  <ImageEditor/>
                  {/* <div id={defaultImage ? "writer-default-camera": "writer-camera"}>
                    <img id={defaultImage ? "writer-camera-default-img": "writer-camera-img"} src={cameraImage} />
                  </div> */}
                  <div id="writer-add-button"></div>
                </div>
                <div className="textfield-container">
                  <div className="textfield-label S-g-text">카페 이름</div>
                  <input className="textfield" type={"text"} placeholder={"카페 명을 입력해주세요"} value={cafeName} disabled></input>
                </div>
                <div id="writer-cafe-address"></div>
                <div id="address-container">
                  <div className="textfield-label S-g-text">카페 주소</div>
                  <div id="postcode-button">
                    <input type="text" id="input-postcode" placeholder="우편번호" value={"-"} disabled/>
                    <input type="button" id="address-button-updater" value="우편번호 찾기" />
                  </div>
                  <input type="text" id="input-address" className="textfield" placeholder="주소" value={cafeAddress} disabled/>
                  {/* <input type="text" id="input-detailAddress" className="textfield" placeholder="상세주소"/> */}
                </div>
              </div>
            </div>
            <div id="writer-button-1" className="btn-main" onClick={onSubmit}>완료</div>
          </div>
        </div>

      </div>
    );
  }
};

export default Updater;