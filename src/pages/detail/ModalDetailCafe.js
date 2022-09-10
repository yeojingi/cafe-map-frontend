import {addComment, addVote, deleteComment, fetchComments, fetchVotes} from '../../lib/axiosFetch';
import './modal.css';
import cam from '../../image/cam.svg';
import commentPic from '../../image/comment.svg';
import { scrapCafe } from '../../lib/axiosFetch';

import { FILTER_STRING, FILTER_ICONS } from '../../lib/FILTER';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import userEvent from '@testing-library/user-event';
import PicModal from './PicModal';

const ModalDetailCafe = () => {
  let isPhoto = false;
  let isComment = false;
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const cafeOnFocus = useSelector(e => e.cafeOnFocus);
  const [myComment, setMyComment] = useState("");
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0]);
  const [myVotes, setMyVotes] = useState([0, 0, 0, 0, 0]);
  // console.log(cafeOnFocus.thumbnail);

  /**
   * functions
   * close
   * tab
   */

  const close = (event) => {
    let modal = document.getElementById("cafe-detail");
  
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const tab = (e) => {
    let tabButtons = document.querySelectorAll(".tab");
    let tabPages = document.querySelectorAll('.tab-page');

    let target = (e.target.id === 'tab-button-1') ? 0 : 1;
    let another = (target + 1) % 2;
    
    tabPages[target].style.display = "block";
    tabPages[another].style.display = "none";
    tabButtons[target].style.backgroundColor = "#fff";
    tabButtons[target].style.boxShadow = "1px 1px 2px var(--m500)";
    tabButtons[another].style.backgroundColor = "var(--m100)";
    tabButtons[another].style.boxShadow = "none";
  }

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

  const onVoteSubmit = () => {
    let cafeId = cafeOnFocus.id;
    
    addVote(cafeId, myVotes).then((res) => {
      alert(res.msg);
      if (res.success) {
        fetchVotes(cafeId).then(res => setVotes(res.votes));
      }
    });

  }

  const onSaveComment = () => {
    if (myComment.length > 80) {
      alert("댓글의 글자 수는 80자 이하로 적어주세요.")
      return ;
    } else {
      addComment(cafeOnFocus.id, myComment).then((res) => {
        if (res.success) {
          fetchComments(cafeOnFocus.id).then(res => setComments(res));
          setMyComment('');
          alert(res.msg);
        } else {
          alert(res.msg);
        }
      });
    }
  }

  const onSavePress = (e) => {
    if(e.key === 'Enter'){
      onSaveComment();
    }
  }

  const onDelete = (id) => {
    deleteComment(id).then((res) => {
      alert(res.msg);
      fetchComments(cafeOnFocus.id).then(res => setComments(res));
    });
  }

  const openImgBtns = () => {
    let modal = document.querySelector(".pic-modal-background");

    modal.style.display = "block";
  }

  const openDeleteModal = () => {
    if (isLoggedIn) {
      let modal = document.querySelector(".delete-modal-background");

      modal.style.display = "block";
    } else {
      alert("로그인이 필요합니다");
    }
  }

  const onShare = () => {
    navigator.clipboard.writeText(`https://cafe-anajones.com/${cafeOnFocus.id}`).then(() => {
      alert("주소가 복사되었습니다");
  });
  }

  useEffect(() => {
    if (cafeOnFocus !== undefined) {
      let page1Btn = document.querySelector("#page1-button");
      setMyVotes([0,0,0,0,0]);
      setMyComment("");
      page1Btn.innerHTML = "투표하기";

      fetchComments(cafeOnFocus.id).then(res => setComments(res));
      fetchVotes(cafeOnFocus.id).then(res => {
        setVotes(res.votes);
        setMyVotes(res.user_vote);
        // 만약 user_vote가 0이 아닌 값을 가지고 있으면
        // #page1-button의 innerText를 다시 투표하기로 바꿈
        for (let i = 0 ; i < res.user_vote.length; i++) {
          if (res.user_vote[i] != 0) {
            page1Btn.innerHTML = "다시 투표하기";
            break;
          }
        }
      });
      
    }
  }, [cafeOnFocus]);

  return (<>
    {(cafeOnFocus == undefined)
    ? <div id="cafe-detail"></div>  
    : <div id="cafe-detail" className="modal-background" onClick={close}>
        <div className="modal">
          <div id="detail-upper-bar">
            <div id="detail-title" className='L-b-text'>
              카페 정보 보기
            </div>
          </div>
          <div id="detail-middle-content">
            <div id="detail-cafe-info">
              
              <div id="detail-cafe-pic-add">
                <div id="detail-cafe-pic" onClick={openImgBtns}>
                  {
                    (cafeOnFocus.thumbnail === null)
                    ? <img id="detail-cafe-pic-cam" src={cam}></img>
                    : <img id="detail-cafe-pic-img" src={cafeOnFocus.thumbnail}></img>
                  }
                </div>
                {(cafeOnFocus.filter.includes(0))
                  ? <div id="add-button" className="icon add-button-saved" onClick={scrapeCafe}></div>
                  : <div id="add-button" className="icon add-button" onClick={scrapeCafe}></div>
                }
              </div>
              <div id="detail-cafe-name" className='M-b-text'>{cafeOnFocus.name}</div>
              <div id="detail-cafe-address" className='M-l-text'>{cafeOnFocus.address}</div>

              <div id="detail-mid-buttons">
                <div id="btn-delete" onClick={openDeleteModal}>삭제하기</div>
                <div id="btn-share" onClick={onShare}>공유하기</div>
              </div>
            </div>
            <div id="detail-keywords-comments">
              <div id="tabs" className='switch-back'>
                <div id="tab-button-1" className="tab switch M-l-text" onClick={tab}>📊 필터</div>
                <div id="tab-button-2" className="tab switch M-l-text" onClick={tab}>📝 한 줄 메모</div>
              </div>
              <div id="tab-page-1" className="tab-page">
                
                <div id="page1-caption" className='S-g-text'>
                  나의 카공 경험을 공유해보세요.<br />
                  필요한 시간은 단 5초!
                </div>
                <div id="page1-content">
                  
                  <div id="keywords-container">
                    {/* 키워드 나열하기 */}
                    {FILTER_STRING.map((e, i) => {
                      if ( i == 0 ) {
                        return;
                      }
                      return (
                        <div className="detail-keywords" key={i}>
                          <img src={FILTER_ICONS[i]} className="icon">
                            </img>
                          <div className="keyword-info">
                            <div className="keyword-name M-l-text">
                              {e}
                            </div>
                            <div className="keyword-vote M-b-text">
                              {votes[i-1]}
                            </div>
                          </div>
                          <input type="checkbox" className="vote-button" checked={myVotes[i-1]}
                            onChange={(e) => {
                              let newMyVotes = [];
                              Object.assign(newMyVotes, myVotes);
                              newMyVotes[i-1] = 1 - newMyVotes[i-1]
                              setMyVotes(newMyVotes);
                            }
                          }/>
                        </div>
                      );

                    })}
                    <div id="page1-button" className='btn-modal' onClick={onVoteSubmit}>투표 참여하기</div>
                  </div>
                </div>
              </div>
              <div id="tab-page-2" className="tab-page">
                  <div id="page2-caption" className='S-g-text'>
                    단 한 줄로  쓰여진 이 카페의 카공 경험을 둘러보세요.<br/>
                    남겨진 메모는 익명 처리 되어 누군가의 카공을 도와줄 수 있어요.
                  </div>
                <div id="page2-content">
                  <form id="comment-input-container">
                    <div id="comment-input-count-container">
                      <input id="comment-input" type={"text"} value={myComment} placeholder="이 카페 어떠셨나요?"
                        onChange={
                          e => {
                            let commentCount = document.querySelector('#comment-count');

                            setMyComment(e.target.value);
                            if (e.target.value.length <= 80) {
                              commentCount.style.color = "#BBB8B8";
                            } else {
                              commentCount.style.color = "var(--sec)";
                            }
                          }
                        }
                        onKeyDown={onSavePress}
                      />
                      <div id="comment-count" className='S-g-text'>{myComment.length}/80</div>
                    </div>
                    <div id="comment-submit" className='btn-modal' type={"submit"} onClick={onSaveComment}>저장</div>
                  </form>
                  
                  {
                    (comments.length > 0)
                    ? <>
                        {comments.map((e, i) => {
                          return (
                            <div className="comment-container">
                              <div className="comment">{e.comment}</div>
                              {(e.isMine)
                              ? <div className='comment-delete' onClick={() => {onDelete(e.id)}}></div>
                              : <div></div>}
                              {/* <div className="comment-id">{e.user_id}</div> */}
                            </div>);
                        })}
                      </>
                    : <>
                        <img id='page2-no-comment-pic' src={commentPic}></img>
                        <div className='M-b-text'>이 카페는 작성된 메모가 없습니다.</div>
                        <div className='M-l-text'>리뷰를 처음으로 남겨보세요.</div>
                      </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }</>
  );
}

export default ModalDetailCafe;