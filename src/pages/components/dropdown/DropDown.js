import { Divider } from "@mui/material";

const DropDown = () => {

  const authOpen = () => {
    let auth = document.querySelector(".auth-modal-background");

    auth.style.display = "block";
  }

  return (
    <div id="dropdown-container">
      <div id="auth-container">
        <div className="dropdown-element dropdown-login M-l-text" onClick={authOpen}>로그인</div>
        <Divider/>
        <div className="dropdown-element dropdown-register M-l-text">회원가입</div>
      </div>
      <div id="dropdown-add-cafe" className="dropdown-element M-b-text">새 카페 등록하기</div>
    </div>
  );
};

export default DropDown;