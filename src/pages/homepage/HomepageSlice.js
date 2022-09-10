import { createStore } from 'redux';
import { authSessionCheck } from '../../lib/axiosFetch';
// import {FILTER,FILTER_STRING} from '../../lib/FILTER';

const cafeReducer = (currentState, action) => {
	//Initialize
	if (currentState === undefined) {
		return {
			cafeList: [],
      cafeSave: [],
      filtersCount: [0, 0, 0, 0, 0, 0],
      cafeOnFocus: undefined,
      visibleFilterMenu: false,
      selectedMenu: new Array(5).fill(false),
      map: undefined,
      markers: [],
      center: {Ma: 37.550892, La:126.925525},
      level: 4,
      isLoggedIn: false,
      userId: '',
		}
	}

  const newState = { ...currentState };
  let newCafeOnFocus;

  switch (action.type) {
    case 'LIST_GET':
      newState.cafeSave = action.cafeList;
      newState.cafeList = newState.cafeSave;
      break;
    case 'FILTER_COUNT_UPDATE':
      newState.filtersCount = action.filtersCount;
      break;
    case 'MARKER_ON_CLICK':
      newState.cafeOnFocus = action.cafeOnFocus;
      break;
    case 'FILTER_MENU_TOGGLE':
      newState.visibleFilterMenu = !newState.visibleFilterMenu;
      break;
    case 'FILTER_MENU_SELECTED':
      newState.selectedMenu = action.selectedMenu;
      // 만약 아무 필터도 설정 안할 경우
      if (newState.selectedMenu.includes(true) === false) {
        newState.cafeList = newState.cafeSave;
      }
      // 필터 뭔가 눌렀을 경우
      else {
        newState.cafeList = newState.cafeSave.filter(e => {
          let isSelected = false;
          for (let i = 0; i < e.filter.length; i ++) {
            isSelected = isSelected || newState.selectedMenu[e.filter[i]];
          }
          return isSelected;
        });
      }
      newState.center = newState.map.getCenter();
      newState.level = newState.map.getLevel();
      break;
    case 'MAP_MOUNT':
      newState.map = action.map;
      break;
    case 'MARKER_CLEAR':
      let markers = newState.markers;
      for (const marker of markers) {
        marker.setMap(null);
      }
      newState.markers = [];
      break;
    case 'MARKER_PUSH':
      newState.markers.push(action.marker);
      break;
    case 'AUTH_SESSION_CHECK':
      newState.isLoggedIn = action.isLoggedIn;
      newState.userId = action.userId;
      break;
    case 'SCRAP_ADD':
      newState.cafeList.map((e, i) => {
        if (e.id == action.cafeId) {
          newState.cafeList[i].filter.push(0);
        } else {
        }
      });
      newCafeOnFocus = {...newState.cafeOnFocus};
      newCafeOnFocus.filter.push(0);
      newState.cafeOnFocus = newCafeOnFocus;
      break;
    case 'SCRAP_DELETE':
      newState.cafeList.map((e, i) => {
        if (e.id == action.cafeId) {
          const idx = e.filter.indexOf(0);
          newState.cafeList[i].filter.splice(idx, 1);
        } else {
        }
      });
      newCafeOnFocus = {...newState.cafeOnFocus};
      const idx = newCafeOnFocus.filter.indexOf(0);
      newCafeOnFocus.filter.splice(idx, 1);
      newState.cafeOnFocus = newCafeOnFocus;
      break;
    case 'MAP_CENTER_SHIFT':
      newState.center = action.center;
      break;
    default:
      console.log(`error: content redux error, no type. given type is ${action.type}`);
  }
  
  return newState;
}

export const cafeStore = createStore(cafeReducer);

export default cafeStore;