import { useState } from "react";
import DropDown from "./dropdown/DropDown";
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../image/logo.svg';
import auth from '../../image/auth.svg';
import { useSelector } from "react-redux";
import { logoutUser } from "../../lib/axiosFetch";

const UpperBar = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const userId = useSelector(state => state.userId);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    let dropdown = document.querySelector("#dropdown-container");

    if (dropdownOpen) {
      dropdown.style.display = 'none';

      setDropdownOpen(false);
    } else {
      dropdown.style.display = 'flex';

      setDropdownOpen(true);
    }

  }

  const authOpen = () => {
    let auth = document.querySelector(".auth-modal-background");

    auth.style.display = "block";
  }

  const logOut = () => {
    logoutUser();
    window.location.href = '/';
  }

  const toWriter = () => {
    if (isLoggedIn) {
      window.location.href="/write";
    } else {
      alert("로그인이 필요합니다.");
    }
  }

  return (
    <div id="upper-bar">
      <div id="logo-container">
        <img src={logo} id="logo" onClick={() => {window.location.href="/"}}/>
        <span id="tagline">홍대 앞, 오늘 갈 카페를 찾는 가장 쉬운 방법</span>
      </div>
      <div id="bar-right">
        <div id="add-cafe-button" className="" onClick={toWriter}>새 카페 등록하기</div>
        {(isLoggedIn)
        ? <div id="auth-button-container" onClick={logOut}>
            <div id="auth-button">{userId}님 로그아웃</div>
          </div>
        : <div id="auth-button-container" onClick={authOpen}>
            <div id="auth-button">로그인/회원가입</div>
            <img id="auth-button-icon" src={auth} />
          </div>}
      </div>
    </div>
  );
}

export default UpperBar;