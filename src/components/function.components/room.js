import axios from "axios";

export const readRoom = async(authtoken, values) => {
    return await axios.get(
        process.env.REACT_APP_API + "/room/" + values, {
            headers: {
                authtoken,
            },
        }
    );
};

export const listRoom = async(authtoken) => {
    return await axios.get(
        process.env.REACT_APP_API + "/room/" , {
            headers: {
                authtoken,
            },
        }
    );
};



export const createRoom = async (authtoken, data) => {
    return await axios.post(
      process.env.REACT_APP_API + "/room/",
      data,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const resetValueRoom = async (authtoken, id, values) => {
    return await axios.put(
      process.env.REACT_APP_API + "/room/" + id, values,
      {
        headers: {
          authtoken,
        },
      }
    );
  }; 






