import UpperBar from '../components/UpperBar';
import MapContainer from './map/MapContainer';
import Shrinkable from './shrinkable/Shrinkable';
import ModalDetailCafe from '../detail/ModalDetailCafe';
import { useDispatch, useSelector } from "react-redux";
import './style.css';
import '../../lib/component.css'
import AuthDialog from '../auth/AuthDialog';
import {authSessionCheck, fetchCafeList} from "../../lib/axiosFetch";
import { useEffect } from 'react';
import PicModal from '../detail/PicModal';
import DeleteModal from '../detail/DeleteModal';
import { useParams } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const {id} = useParams();

  // cafe list 받아오기
  fetchCafeList()
    .then(result => {
      dispatch({
        type: "LIST_GET",
        cafeList: result,
      });
      let filtersCount = new Array(6).fill(0);

      for (let i = 0; i < result.length; i++) {
        result[i].filter.forEach((e, i) => {
          filtersCount[e]++;
        });
        
        if (id !== undefined && result[i].id == id) {
          dispatch({
            type: 'MARKER_ON_CLICK',
            cafeOnFocus: result[i],
          });

          dispatch({
            type: 'MAP_CENTER_SHIFT',
            center: {La: result[i].longitude, Ma:result[i].latitude}
          });
          const modal = document.getElementById("cafe-detail");
          modal.style.display = "block";
        }
      }

      dispatch({
        type: "FILTER_COUNT_UPDATE",
        filtersCount: filtersCount
      })

      
    });

  const getLocation = () => {
    let lat, long;
    if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            // 현재 내가 위치한 장소의 lat, long 변수에 저장!
        }, function(error) {
            console.error(error);
        }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
        });
    } else {
        alert('GPS를 지원하지 않습니다');
        return;
    }
  }

  useEffect(() => {
    authSessionCheck(dispatch);
  }, []);

  return (
    <div id="outer-container">
      <UpperBar/>
      <div id="content-container">
        <MapContainer />
        <Shrinkable />
      </div>
      <ModalDetailCafe />
      <PicModal />
      <AuthDialog open={true}/>
      <DeleteModal />
      {getLocation()}
    </div>
  );
}

export default HomePage;