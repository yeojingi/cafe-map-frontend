import axios from 'axios';
import { FILTER } from './FILTER';

const API_BASE_URL = process.env.REACT_APP_API_ROOT;
const queryString = require('query-string');

export const fetchCafeList = async () => {
  let response = await axios({
    method: 'GET', 
    url:`${API_BASE_URL}/cafe/list`,
    withCredentials: true,
  });
  return response.data;
}

export const fetchCafeFilterList = async (filterData) => {
  var queryData = {};
  for (var key in filterData){
    queryData[FILTER[parseInt(key)+1]]=filterData[key]
  }
  let response = await axios({
    method: 'GET', 
    url:`${API_BASE_URL}/cafe/list/filter?${queryString.stringify(queryData)}`,
    withCredentials: true,
  });
  return response.data;
}

export const isPhoneInDb = async (phone) => {
  let response = await axios({
    method: 'POST',
    url: `${API_BASE_URL}/cafe/auth/isUser`,
    data: {phone},
  })
  
  if (response.data.isUser === 'login') {
    return response.data;
  } else if (response.data.isUser === 'join') {
    return response.data;
  }

  console.log(response.data.message);
  return response.data;
}

export const registerUser = async (phone, password) => {
  let response = await axios({
    method: 'POST',
    url: `${API_BASE_URL}/cafe/auth/join`,
    data: {phone, password}
  })

  return response.data.isRegistered;
};

export const loginUser = async (phone, password) => {
  let response = await axios({
    method: 'POST',
    url: `${API_BASE_URL}/cafe/auth/login`,
    data: {phone, password},
    withCredentials:true,
  })
  
  return response.data;
}

export const authSessionCheck = async (dispatch) => {
  let response = await axios({
    method: 'GET', 
    url:`${API_BASE_URL}/cafe/auth/session`,
    withCredentials:true,
  })
  .then(result => {
    // console.log(result.data);
    dispatch({
      type: "AUTH_SESSION_CHECK",
      isLoggedIn: result.data.isLoggedIn,
      userId: result.data.userId
    });
  });
  // return response.data.isLoggedIn;
}

export const logoutUser = async () => {
  let response = await axios({
    method: 'GET',
    url: `${API_BASE_URL}/cafe/auth/logout`,
    withCredentials: true,
  });

  return response.logoutSuccess;
}

export const fetchKeywordOfCafe = async (id) => {
  let response = await axios({
    method: 'GET',
    url: `${API_BASE_URL}/cafe/detail?cafeId=${id}`,
    withCredentials: true,
  });
  console.log(response.data);
  return response.data.filter_id;
}

export const addScrap = async (cafe_id) => {
  let response = await axios({
    method: 'POST',
    url: `${API_BASE_URL}/cafe/list/scrap`,
    data: {cafe_id},
    withCredentials: true,
  })
  console.log(response.data);

  return response.data.message;
}

export const fetchScrappedCafe = async () => {
  let response = await axios({
    method: 'GET',
    url: `${API_BASE_URL}/cafe/list/scrap/filter`,
    withCredentials: true,
  })

  return response.data;
}

export const fetchCafeDetail = async (id) => {
  let response = await axios({
    method: 'GET', 
    url:`${API_BASE_URL}/cafe/detail?cafeId=${id}`
  });

  return response.data;
}


export const convertAddressLatlng = async (id, lat, lng) => {
  let response = await axios({
    method: 'POST', 
    url:`${API_BASE_URL}/cafe/convertAddress`,
    data: {id, lat, lng},
    withCredentials: true,
  })
  return response.data;
}

export const fetchComments = async (cafeId) => {
  let response = await axios({
    method: "GET",
    url: `${API_BASE_URL}/cafe/comment/?id=${cafeId}`,
    withCredentials: true,
  });
  if (response.data.success) {
    return response.data.comments;
  } else {
    alert(response.data.message);
    return [];
  }
}

export const addComment = async (cafeId, comment) => {
  let response = await axios({
    method: "POST",
    url: `${API_BASE_URL}/cafe/comment/create/?id=${cafeId}`,
    data: {cafe_id: cafeId, comment: comment,},
    withCredentials: true,
  });
  
  return {"success": response.data.success, "msg": response.data.message};  
}

export const deleteComment = async (id) => {
  let response = await axios({
    method: "POST",
    url: `${API_BASE_URL}/cafe/comment/delete`,
    data: {id: id},
    withCredentials: true,
  });
  
  return {"success": response.data.success, "msg": response.data.message};
}

export const fetchVotes = async (cafeId) => {
  let response = await axios({
    method: "GET",
    url: `${API_BASE_URL}/cafe/vote/?id=${cafeId}`,
    withCredentials: true,
  });
  if (response.data.success) {
    return response.data;
  } else {
    alert(response.data.message);
    return [];
  }
}

export const addVote = async (cafeId, myVote) => {
  let response = await axios({
    method: "POST",
    url: `${API_BASE_URL}/cafe/vote/save`,
    data: {cafe_id: cafeId, vote: myVote,},
    withCredentials: true,
  });
  
  return {"success": response.data.success, "msg": response.data.message};  
}

export const scrapCafe = async(cafeId) => {
  let response = await axios({
    method: "POST",
    url: `${API_BASE_URL}/cafe/list/scrap`,
    data: {cafe_id: cafeId},
    withCredentials: true,
  })

  return response.data;
}

export const addCafe = async(formData) => {
  console.log(formData);
  let response = await axios({
    method: "POST",
    url: `${API_BASE_URL}/cafe/create`,
    data: formData,
    withCredentials: true,
  });
  
  return response.data;
}

export const addCafeWithImage = async(formData) => {
  console.log(formData);
  let response = await axios({
    method: "POST",
    url: `${API_BASE_URL}/cafe/createPhoto`,
    data: formData,
    withCredentials: true,
    headers: { "Content-type" : "multipart/form-data"},
  });

  return response.data;
}

export const updateCafeImage = async (formData) => {
  let response = await axios({
    method: "POST",
    url: `${API_BASE_URL}/cafe/update`,
    data: formData,
    withCredentials: true,
    headers: { "Content-type" : "multipart/form-data"},
  });

  console.log('update axios is executed');
  return response.data;
};

export const fetchNumDelete = async (cafeId) => {
  let response = await axios({
    method: "GET",
    url: `${API_BASE_URL}/cafe/delete?cafeId=${cafeId}`,
    data: {cafe_id: cafeId},
    withCredentials: true,
  })

  return response.data;
}

export const deleteCafe = async (cafeId) => {
  let response = await axios({
    method: "POST",
    url: `${API_BASE_URL}/cafe/delete`,
    data: {cafe_id: cafeId},
    withCredentials: true,
  })

  return response.data;
}