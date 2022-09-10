import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isPhoneInDb, loginUser, registerUser, authSessionCheck } from '../../lib/axiosFetch';
import './AuthDialog.css';
import ok from '../../image/ok.svg';
import { Divider } from '@mui/material';

const AuthDialog = ({ open, onClose }) => {
  const EPages = {
    PHONE_NUMBER_PAGE: 0,
    LOGIN_PAGE: 1,
    REGISTER_PAGE: 2,
  }

  const [phoneNumber, setPhoneNumber] = useState('');
  const [page, setPage] = useState(0);
  const [isUser, setIsUser] = useState(false);
  const [password, setPassword] = useState('');

  const [stateCaption, setStateCaption] = useState('');
  const [validatorPhoneNumber, setValidatorPhoneNumber] = useState('');
  const [validatorPassword, setValidatorPassword] = useState('');

  const PHONE_NUMBER_LENGTH = 3+1+4+1+4;

  const dispatch = useDispatch();

  // 텍스트 필드 ; 핸드폰 입력
  const onPhoneChange = (e) => {
    if (e.target.value.length > PHONE_NUMBER_LENGTH) {
      setPhoneNumber(phoneNumber);
    } else {
      let value = e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
      setPhoneNumber(value);
      setValidatorPhoneNumber('');
    }
  };

  // 텍스트 필드 ; 비밀번호 입력
  const onPasswordChange = (e) => {
    let value = e.target.value;
    setPassword(value);
    setValidatorPassword('');
  };

  // 핸드폰 번호 입력 완료시
  const onPhoneSubmit = (e) => {
    if (phoneNumber.length !== PHONE_NUMBER_LENGTH) {
      setValidatorPhoneNumber('* 핸드폰 번호를 정확히 입력해주세요');
      return ;
    }
    isPhoneInDb(phoneNumber)
      .then((res)=> {
        console.log(res);
        if (res.isUser === 'login') {
          setIsUser(res.isUser);
          setPage(EPages.LOGIN_PAGE);
        } else if (res.isUser === 'join') {
          setPage(EPages.REGISTER_PAGE);
        } else {
          setValidatorPhoneNumber(res.message);
        }
      });
  }

  const onPhoneSubmitPress = (e) => {
    if(e.key === 'Enter'){
      onPhoneSubmit();
    }
  }

  // 비밀번호 입력 완료시
  const onPasswordSubmit = (e) => {
    if (password.length <= 5) {
      setValidatorPassword('* 비밀번호는 6자 이상입니다');
      return ;
    }
    switch (page) {
      case EPages.LOGIN_PAGE:
        loginUser(phoneNumber, password).then(
          ({isLoggedIn, message}) => {
            if (isLoggedIn === true) {      
              authSessionCheck(dispatch)    
              // home으로 redirect
              window.location.href = '/';
            } else {
              setValidatorPassword('* ' + message);
            }
          }
        );
        break;
      case EPages.REGISTER_PAGE:
        registerUser(phoneNumber, password).then(
          isRegistered => {
            if (isRegistered === true) {
              loginUser(phoneNumber, password).then(
                ({isLoggedIn, message}) => {
                  if (isLoggedIn === true) {      
                    authSessionCheck(dispatch)    
                    // home으로 redirect
                    window.location.href = '/';
                  } else {
                    setValidatorPassword('* ' + message);
                  }
                }
              );
            }
          }
        );
        break;
    }
  }

  const onPasswordSubmitPress = (e) => {
    if(e.key === 'Enter'){
      onPasswordSubmit();
    }
  }

  // 팝업창 꺼질 때 초기화 함수들
  const onDialogClose = () => {
    setPage(0);
    setPhoneNumber('');
    setValidatorPassword('');
    setValidatorPhoneNumber('');
    onClose();
  }

  const close = (event) => {
    var modal = document.querySelector(".auth-modal-background");
  
    if (event.target == modal) {
      modal.style.display = "none";
      setPage(0);
      setPhoneNumber('');
      setValidatorPassword('');
      setValidatorPhoneNumber('');
    }
  };

  // 페이지화
  // 0: 핸드폰 입력
  // 1: 비밀번호 입력
  const pagination = (page) => {
    switch (page) {
      case EPages.PHONE_NUMBER_PAGE:
        return ( <>
          <div id="auth-upper-bar">
            <div id="auth-title" className='L-b-text'>
              로그인 또는 회원가입
            </div>
          </div>
          <div id='auth-banner'>
            <img id="auth-banner-ok" src={ok} />
            <div id='auth-banner-caption' className='M-b-text'>
              우리는 오늘 할 일만 해요<br/>
              카페는 카공여지도가 찾아드릴게요 
            </div>
          </div>
          <div id='auth-registration' className='M-l-text'> </div>
          <div id="auth-input-container">
            <div id="auth-input-label" className='S-b-text'>전화번호</div>
            <input id="auth-input" type={"text"} value={phoneNumber} onChange={onPhoneChange} onKeyDown={onPhoneSubmitPress} placeholder="01000000000 (괄호나 띄어쓰기 없이 입력해주세요.)"></input>
            <div className='input-validator'>{validatorPhoneNumber}</div>
            <div id="auth-input-caption" className='S-l-text'>보다 정확한 정보를 위해 전화번호를 입력해주세요.</div>
          </div>
          <div id="auth-input-btn" onClick={onPhoneSubmit} >계속</div>
        </>
        );
        
      case EPages.LOGIN_PAGE:
        return (<>
          <div id="auth-upper-bar">
            <div id="auth-title" className='L-b-text'>
              로그인 또는 회원가입
            </div>
          </div>
          <div id='auth-banner'>
            <img id="auth-banner-ok" src={ok} />
            <div id='auth-banner-caption' className='M-b-text'>
              우리는 오늘 할 일만 해요<br/>
              카페는 카공여지도가 찾아드릴게요 
            </div>
          </div>
          <div id='auth-registration' className='M-l-text'>{phoneNumber}님의 계정이 확인 되었습니다.</div>
          <div id="auth-input-container">
            <div id="auth-input-label" className='S-b-text'>비밀번호</div>
            <input id="auth-input" type={"password"} value={password} onChange={onPasswordChange} onKeyDown={onPasswordSubmitPress} placeholder="비밀번호를 입력해주세요."></input>
            <div className='input-validator'>{validatorPassword}</div>
            <div id="auth-input-caption" className='S-l-text'>비밀번호를 입력하고 로그인을 완료하세요.</div>
          </div>
          <div id="auth-input-btn" onClick={onPasswordSubmit}>로그인</div>
        </>);
        
      case EPages.REGISTER_PAGE:
        return (<>
          <div id="auth-upper-bar">
            <div id="auth-title" className='L-b-text'>
              로그인 또는 회원가입
            </div>
          </div>
          <div id='auth-banner'>
            <img id="auth-banner-ok" src={ok} />
            <div id='auth-banner-caption' className='M-b-text'>
              우리는 오늘 할 일만 해요<br/>
              카페는 카공여지도가 찾아드릴게요 
            </div>
          </div>
          <div id='auth-registration' className='M-l-text'>{phoneNumber}님의 회원가입을 완료하세요.</div>
          <div id="auth-input-container">
            <div id="auth-input-label" className='S-b-text'>비밀번호</div>
            <input id="auth-input" type={"password"} value={password} onChange={onPasswordChange} onKeyDown={onPasswordSubmitPress} placeholder="비밀번호를 입력해주세요."></input>
            <div className='input-validator'>{validatorPassword}</div>
            <div id="auth-input-caption" className='S-l-text'>비밀번호를 입력하고 로그인을 완료하세요.</div>
          </div>
          <div id="auth-input-btn" onClick={onPasswordSubmit}>회원가입 및 로그인</div>
        </>);

    }
    return ;
  };

  return (
    <div className='auth-modal-background' onClick={close}>
      <div className='auth-modal'>
        {pagination(page)}
      </div>
    </div>
  );
};

export default AuthDialog;