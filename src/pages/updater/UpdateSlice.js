import { createStore } from 'redux';
import defaultImage from './image_editor/defaultImage';
import Image from '../../image/write-default-image.png';
// import {FILTER,FILTER_STRING} from '../../lib/FILTER';

const updateReducer = (currentState, action) => {
	//Initialize
  const image = Image

	if (currentState === undefined) {
		return {
      title: "",
      image: image,
      imageFile: image,
      defaultImage: true,
      selectedFilter: new Array(5).fill(false),
      featureBlockNum: 1,
      blockTitle: new Array(1).fill(""),
      blockContent: new Array(1).fill(""),
      isLoggedIn: undefined,
		}
	}

  const newState = { ...currentState };

  switch (action.type) {
    case 'CAFETITLE_GET':
      newState.title = action.title;
      break;
    case 'IMAGE_UPLOAD':
      newState.imageFile = action.image
      newState.image = URL.createObjectURL(action.image);
      newState.defaultImage = false;
      break;
    case 'IMAGE_DEFAULT':
      newState.imageFile = action.image
      newState.image = action.image
      newState.defaultImage = true;
      break;
    case 'FILTER_SELECTED':
      newState.selectedFilter = action.selectedFilter;
      break;
    case 'FILTER_CLICKED':
      newState.selectedFilter = action.selectedFilter;
      break;
    case 'FEATURE_BLOCK_ADD':
      newState.featureBlockNum += 1;
      newState.blockTitle.push("")
      newState.blockContent.push("")
      break;
    case 'FEATURE_BLOCK_REMOVE':
      newState.featureBlockNum -= 1;
      break;
    case 'FEATURE_BLOCK_TITLE_GET':
      newState.blockTitle = action.blockTitle;
      break;
    case 'FEATURE_BLOCK_CONTENT_GET':
      newState.blockContent = action.blockContent;
      console.log(newState.blockContent);
      break;
    case 'AUTH_SESSION_CHECK':
      newState.isLoggedIn = action.isLoggedIn;
      break;
    default:
      console.log('error: content redux error, no type');
  }
  
  return newState;
}


export const updateStore = createStore(updateReducer);

export default updateStore;