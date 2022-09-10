import './iModal.css';
import btn from '../../../image/info.svg';
import closeSign from '../../../image/close.svg';
import { useState } from 'react';

export const InfoModal = ({idName, text}) => {
  let thisId = "id-" + idName;
  let me = document.querySelector("." + thisId);

  function close () {
    me.style.display = "none";
  }

  return (
    <div className={"info-modal id-" + idName }>
      <div className='S-w-text info-modal-text'>{text}</div>
      <img className='info-modal-close-btn' src={closeSign} onClick={close}></img>
    </div>
  );
};

export const InfoModalBtn = ({idName}) => {
  let modalId = "id-" + idName;
  let myModal = document.querySelector("." + modalId);

  function openModal () {
      myModal.style.display = "flex";
  };

  return (
    <div className={'info-btn info-btn-'+idName}>
      <img src={btn} onClick={openModal}></img>
    </div>
  );
}