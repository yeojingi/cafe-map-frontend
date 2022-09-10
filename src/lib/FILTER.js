import save from '../image/save.svg';
import icon0 from '../image/icon0.svg';
import icon1 from '../image/icon1.svg';
import icon2 from '../image/icon2.svg';
import icon3 from '../image/icon3.svg';
import icon4 from '../image/icon4.svg';


const FILTER = {
    0: 'SAVED',
    1:'IS_CONSENT',
    2:'IS_WIDE',
    3:'IS_COZY',
    4:'IS_QUIET',
    5:'IS_NOONCHI'
}
const FILTER_NUM_STRING = {
    0:"내가 저장한 공간",
    1:"콘센트 많아요",
    2:"책상 넓어요",
    3:"의자, 책상 편해요",
    4:"조용해요",
    5:"눈치 덜 보여요"
}

const FILTER_STRING = [
    "내가 저장한 공간",
    "콘센트 많아요",
    "책상 넓어요",
    "의자, 책상 편해요",
    "조용해요",
    "눈치 덜 보여요"
];

const FILTER_ICONS = [
    save,
    icon0,
    icon1,
    icon2,
    icon3,
    icon4,
]

export {FILTER, FILTER_NUM_STRING, FILTER_STRING, FILTER_ICONS}