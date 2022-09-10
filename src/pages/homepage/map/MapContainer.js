import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import earth from '../../../image/earth.png';
import AdComponent from "../../components/AdComponent";

const MapContainer = () => {
  const cafeList = useSelector((state) => state.cafeList);
  const { kakao } = window;

  // from previous MapContainer.js
  const dispatch = useDispatch();
  const pinSize = 28;
  const pinClickedSize = pinSize*1;
  const {La, Ma} = useSelector((state) => state.center);
  const mapLevel = useSelector((state) => state.level);
  let map = useSelector((state) => state.map);

  useEffect(() => {
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(Ma, La),
      level: mapLevel
    };
    map = new kakao.maps.Map(container, options);
    dispatch({
      type: 'MAP_MOUNT',
      map: map,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'MARKER_CLEAR',
    })

    var selectedPin = null;
    var selectedOverlay = null;

    for (let i = 0; i < cafeList.length; i++) {
      

      var content = document.createElement('div');

      content.className = `map-pin`;
      content.id = `pin${i}`;
      content.innerHTML = `
        ${cafeList[i].name}
        <span class="right"></span>
        <span class="arrow"></span>
        `;

      // 커스텀 오버레이가 표시될 위치
      let position = new kakao.maps.LatLng(cafeList[i].latitude, cafeList[i].longitude);  

      // 커스텀 오버레이를 생성합니다
      let customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content   
      });
      
      content.onclick = (e) => {
        let newSelected = document.querySelector(`#pin${i}`);
        if (!selectedPin || selectedPin !== newSelected) {
          if (selectedPin !== null) {
            selectedPin.className = "map-pin";
            selectedOverlay.setZIndex(1);
          }
        }
        
        selectedOverlay = customOverlay;
        selectedOverlay.setZIndex(5);
        newSelected.className = "map-pin-clicked";
        selectedPin = newSelected;

        dispatch({
          type: 'MARKER_ON_CLICK',
          cafeOnFocus: cafeList[i]
        });
      };

      dispatch({
        type: "MARKER_PUSH",
        marker: customOverlay,
      })

      customOverlay.setMap(map);
    } // for

  }, [cafeList, dispatch]);
  

  useEffect(() => {
    map.setCenter(new kakao.maps.LatLng(Ma, La));
  }, [La, Ma]);

  return (
    <div id="map-container">
      <div id="my-location" className="icon my-location"></div>
      <div id="ad">
        <AdComponent />
        <img src={earth} id="floating-earth" />
      </div>
      <div id="map"></div>
    </div>
  );
}

export default MapContainer;