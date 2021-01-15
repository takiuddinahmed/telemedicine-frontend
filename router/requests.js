const axios = require("axios");

const sendGetReq = async (url) => {
  try {
    const response = await axios.get(url);
    // console.log(response);
    return { ok: true, res: response.data };
  } catch (e) {
    return { ok: false, err: e };
  }
};

const sendPostReq = async (url, data) =>{
  try{
    const response = await  axios.post(url, data);
    
    return {ok: true, res: response.data};
  }
  catch(e){
    console.error(e);
    return {ok: false, err: e};
  }
}

module.exports = {
  sendGetReq,
  sendPostReq
};
