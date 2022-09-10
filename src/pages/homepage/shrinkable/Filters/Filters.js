import { InfoModal, InfoModalBtn } from "../../../components/info/iModal";
import { useEffect, useState } from "react";
import save from '../../../../image/save.svg';
import { FILTER_STRING, FILTER_ICONS } from "../../../../lib/FILTER";

import './Filter.css';
import { useDispatch, useSelector } from "react-redux";

const Filters = () => {
  const [folded, setFolded] = useState(true);
  const selectedMenu = useSelector(e => e.selectedMenu);
  const filtersCount = useSelector(state => state.filtersCount);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const filterStretch = () => {
    let foldButton = document.querySelector(".fold-button");
    let filters = document.querySelectorAll(".filter");
    let filterTitle = document.querySelector("#filter-title");
    let filterIcons = document.querySelectorAll(".filter-icon");
    let filterAmounts = document.querySelectorAll(".filter-amount");

    let headContainer = document.querySelector("#filter-head-info");
    let modalBtn = document.querySelector(".info-btn-2");
    let modal = document.querySelector(".id-2");
  
    // 열린 거 닫을 때
    if (!folded) {
      filters.forEach((e) => {
        e.className = "filter";
      })
      for (let i = 0; i < filterIcons.length; i++) {
        filterIcons[i].style.display="none";
        filterAmounts[i].style.display="none";
      }
      filterTitle.style.display = "none";
  
      foldButton.id = "fold-button";

      headContainer.style.display = "none";
      modal.style.display="none";
      modalBtn.style.display="none";

      setFolded(true);
    } 
    // 닫은 거 열 때
    else {
      filters.forEach((e) => {
        e.className = "filter filter-unfolded";
      })
      for (let i = 0; i < filterIcons.length; i++) {
        filterIcons[i].style.display="inline-block";
        filterAmounts[i].style.display="inline-block";
      }
      filters.forEach(e => {
        e.className = "filter filter-unfolded";
      });
      filterTitle.style.display = "inline";
  
      foldButton.id = "unfolded-button";

      headContainer.style.display="flex";
      modalBtn.style.display="inline-block";

      setFolded(false);
    }
  }

  const filterClick = (e, i) => {
    let filters = document.querySelectorAll(".filter");

    if ( i == 0 ) {
      if ( !isLoggedIn ) {
        alert("로그인이 필요합니다.");
        return;
      }
    }

    if (selectedMenu[i] == false) {
      filters[i].style.boxShadow = "inset -2px -2px 4px #FFFFFF, inset 2px 2px 4px rgba(0, 0, 0, 0.16)";
      selectedMenu[i] = true;
      dispatch({
        type: "FILTER_MENU_SELECTED",
        selectedMenu: selectedMenu,
      });
    } else {
      filters[i].style.boxShadow = "-4px -4px 6px #FFFFFF, 2px 2px 4px rgba(0, 0, 0, 0.16)";
      selectedMenu[i] = false;
      dispatch({
        type: "FILTER_MENU_SELECTED",
        selectedMenu: selectedMenu,
      });
    }
  };

  return (
    <div id="filter-container" className="folded">
      <div id="fold-button" className="fold-button" onClick={filterStretch}></div>
      <div id="filter-head-info">
        <div id="filter-title" className="L-b-text">필터로 보기</div>
        <InfoModalBtn idName="2" />
        <InfoModal idName="2" text={"필터 얘기야"}/>
      </div>
      <div id="filters">
        {/* <div className="filter folded button-1">
          <img src={save} className="filter-icon"></img>
          <div className="filter-amount">{filtersCount[0]}</div>
          <div className="filter-name M-l-text">내가 저장한 공간</div>
        </div> */}
        {FILTER_STRING.map((e, i) => {
          return (
            <div className="filter folded" key={i} onClick={e => filterClick(e, i)}>
              <img src={FILTER_ICONS[i]} className="filter-icon"></img>
              <div className="filter-amount">{filtersCount[i]}</div>
              <div className="filter-name M-l-text">{e}</div>
            </div>
          );
        })}
        <div id="filters-margin"></div>
      </div>
    </div>
  );
}

export default Filters;