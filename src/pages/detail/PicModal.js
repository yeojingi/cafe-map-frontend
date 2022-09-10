import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './PicModal.css';

const PicModal = () => {
  const cafeOnFocus = useSelector(state => state.cafeOnFocus);
  const [btnsOrImg, setBtnsOrImg] = useState(true);

  const close = (event) => {
    var modal = document.getElementById("pic-modal");
  
    if (event.target == modal) {
      modal.style.display = "none";
      setBtnsOrImg(true);
    }
  };

  const viewImage = () => {
    setBtnsOrImg(false);
  }

  const modifyImage = () => {
    window.location.href=`/update/${cafeOnFocus.id}`;
  }

  return (
    <>
    {(cafeOnFocus === undefined)
    ? <></>
    :
    <div id="pic-modal" className="pic-modal-background" onClick={close}>
      {(btnsOrImg)
      ? <div className="pic-modal">
          {(cafeOnFocus.thumbnail === null)
          ? <div id='modify-image' className='pic-btns'>이미지 추가하기</div>
          : <>
              <div id='view-img' className='pic-btns' onClick={viewImage}>사진 크게 보기</div>
              <div id='modify-image' className='pic-btns' onClick={modifyImage}>이미지 수정하기</div>
            </>
          }
        </div>
      : <img id={"big-img"} src={cafeOnFocus.thumbnail} onClick={close}></img>
      }
    </div>
    }
    </>
  );
};

export default PicModal;