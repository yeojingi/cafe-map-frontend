import { useState } from "react";
import Filters from './Filters/Filters';
import { InfoModalBtn, InfoModal } from "../../components/info/iModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCafeList, scrapCafe } from "../../../lib/axiosFetch";

const Shrinkable = () => {
  const cafeOnFocus = useSelector(e => e.cafeOnFocus);
  const cafeList = useSelector(e => e.cafeList);
  const dispatch = useDispatch();

  const modalOpen = () => {
    var modal = document.getElementById("cafe-detail");

    modal.style.display = "block";
  };

  const scrapeCafe = () => {
    let cafeId = cafeOnFocus.id;

    scrapCafe(cafeId).then(res => {
      if (res.success) {
        // 추가일 경우
        if (res.isAddOrDelete) {
          dispatch({type: "SCRAP_ADD", cafeId: cafeId});
        } else {
        // 삭제일 경우
          dispatch({type: "SCRAP_DELETE", cafeId: cafeId});
        }

        alert(res.message);
      } else {
        alert(res.message);
      }
    });
  }

  return (
    <div id="shrinkable">
      <Filters/>
      {(cafeOnFocus == undefined)
      ? <div></div>
      : <div id="cafe-info">
          <div id="cafe-head-info">
            <div id="cafe-name" className="L-b-text">카공 위키</div>
            <InfoModalBtn idName="1" />
            <InfoModal idName="1" text={"카페 정보야"}/>
          </div>
          <div id="cafe-pic-add">
            {(cafeOnFocus.thumbnail === null)
            ? <>
                <div id="cafe-pic"></div>
                <div id="cafe-pic-caption">
                  <span id="cafe-pic-caption-1">이런, 이 장소는 아직 등록된 사진이 없어요</span><br />
                  <span id="cafe-pic-caption-2">자세히 보기를 눌러 더 많은 정보를 얻어보세요.</span>
                </div>
              </>
            : <div id="cafe-pic"><img id="cafe-pic-img" src={cafeOnFocus.thumbnail}></img></div>}
            
            
            
            {(cafeOnFocus.filter.includes(0))
            ? <div id="add-button" className="icon add-button-saved" onClick={scrapeCafe}></div>
            : <div id="add-button" className="icon add-button" onClick={scrapeCafe}></div>
            }
            
          </div>
          <div id="cafe-keywords" className="L-b-text">{cafeOnFocus.name}</div>
          <div id="cafe-address-button" className="btn-main" onClick={modalOpen}>자세히 보기</div>
        </div>
      }
      
    </div>
  );
};

export default Shrinkable;