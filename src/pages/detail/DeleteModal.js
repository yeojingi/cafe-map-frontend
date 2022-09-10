import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteCafe, fetchNumDelete } from '../../lib/axiosFetch';
import './DeleteModal.css';

const DeleteModal = () => {
  const cafeOnFocus = useSelector(state => state.cafeOnFocus);
  const [numDelete, setNumDelete] = useState(0);

  const close = (event) => {
    let modal = document.getElementById("delete-modal");
    let closeBtn = document.getElementById("delete-close")
  
    if (event.target == modal || event.target == closeBtn) {
      modal.style.display = "none";
    }
  };

  const onDelete = () => {
    deleteCafe(cafeOnFocus.id).then((res) => {
      alert(res.message);
    })
  }

  useEffect(() => {
    if (cafeOnFocus !== undefined) {
      fetchNumDelete(cafeOnFocus.id).then((res) => {
        setNumDelete(res.cnt);
      });
    }
  }, [cafeOnFocus]);


  return (
    <>
    {(cafeOnFocus === undefined)
    ? <></>
    :
    <div id="delete-modal" className="delete-modal-background" onClick={close}>
      <div className="delete-modal">
        <div id="delete-info">
          <p style={{marginBottom: "8px"}}>
          [삭제 요청이 필요한 경우에 대한 안내]<br />
            ・ 무의미한 문자 배열이 적힌 잘못된 게시물의 경우<br />
            ・ 카페가 폐업 처리된 경우<br />
            ・ 카페가 용도 변경된 경우 (예. 식당으로 바뀌었어요.)<br />
          </p>
          <p>
          [게시글이 삭제되는 과정에 대한 안내]<br />
          ・ 삭제 요청이 3회 이상 누적된 게시글에 대해 관리자가 직접 검토 후 삭제처리 됩니다.<br />
          ・ 검토는 매 월 1일 진행됩니다.<br />
          </p>
        </div>
        <div id="delete-question">지금 고른 {cafeOnFocus.name}의 삭제 요청을 하시겠습니까?</div>
        <div id="delete-btn-set">
          <div id='delete-close' onClick={close}>닫기</div>
          <div id='delete-btn' onClick={onDelete}>삭제하기 {numDelete}/3</div>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default DeleteModal;