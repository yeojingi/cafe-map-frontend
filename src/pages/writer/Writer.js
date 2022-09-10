import ImageEditor from "./image_editor/ImageEditor";
import UpperBar from "../components/UpperBar";
import './writer.css';
import DaumPostcodeEmbed from 'react-daum-postcode';
import earth from '../../image/earth.png';
import cameraImage from "../../image/writer_camera.png";
import { useDispatch, useSelector } from "react-redux";
import { WindowSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { addCafe, addCafeWithImage, authSessionCheck } from "../../lib/axiosFetch";

import { useDaumPostcodePopup } from 'react-daum-postcode';

const Writer = () => {
  const defaultImage = useSelector((state) => state.defaultImage);
  const image = useSelector((state) => state.image);
  const imageFile = useSelector((state) => state.imageFile);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  const DAUM_POST_CODE_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const { kakao } = window;

  const geocoder = new kakao.maps.services.Geocoder();

  const [cafeName, setCafeName] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [LatLng, setLatLng] = useState([0, 0]);

  const onCafeNameChange = (e) => {
    setCafeName(e.target.value);
  }

  const onSubmit = () => {
    // validation
    if (cafeName === '') {
      alert("카페 이름을 적어주세요");
    }
    else if (zonecode === '') {
      alert("주소를 입력해주세요");
    }
    // if validated
    else {
      let formData = new FormData();
      console.log(image);
      // if (!defaultImage) {
      //   formData.append("image", image);
      // } 
      formData.append("name", cafeName);
      formData.append("address", address);
      formData.append("latitude", LatLng[0]);
      formData.append("longitude", LatLng[1]);
      
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
      }

      console.log(defaultImage);
      if (defaultImage == true) {
        addCafe({
          name:cafeName,
          address:address,
          latitude:LatLng[0],
          longitude:LatLng[1]
        }).then((res) => {
          if (res.success) {
            window.location.href = '/';
            // console.log(res, defaultImage, image);
          }
        });
      } else {
        formData.append("image", imageFile);
        addCafeWithImage(formData).then((res) => {
          if (res.success) {
            window.location.href = '/';
            // console.log(res, defaultImage, image);
          }
        });

      } 
    }
  }

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setZonecode(data.zonecode);
    setAddress(data.roadAddress);
    geocoder.addressSearch(data.roadAddress, function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setLatLng([result[0].y, result[0].x]);
      }
    });
  };

  const open = useDaumPostcodePopup(DAUM_POST_CODE_URL);
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  useEffect(() => {
    authSessionCheck(dispatch);
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
              <div id="writer-title" className="L-b-text">새 카페 등록하기</div>
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
                  <input className="textfield" type={"text"} placeholder={"카페 명을 입력해주세요"} value={cafeName} onChange={onCafeNameChange}></input>
                </div>
                <div id="writer-cafe-address"></div>
                <div id="address-container">
                  <div className="textfield-label S-g-text">카페 주소</div>
                  <div id="postcode-button">
                    <input type="text" id="input-postcode" placeholder="우편번호" value={zonecode} disabled/>
                    <input type="button" id="address-button" value="우편번호 찾기" onClick={handleClick}/>
                  </div>
                  <input type="text" id="input-address" className="textfield" placeholder="주소" value={address} disabled/>
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

export default Writer;