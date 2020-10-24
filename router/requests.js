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

module.exports = {
  sendGetReq,
};
