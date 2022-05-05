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



export const removeRoom = async(authtoken, values) => {
  return await axios.delete(
      process.env.REACT_APP_API + "/room/" + values, {
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




// Problem

export const listProblem = async(authtoken) => {
    return await axios.get(
        process.env.REACT_APP_API + "/problem/" , {
            headers: {
                authtoken,
            },
        }
    );
  };


export const readProblem = async(authtoken, values) => {
    return await axios.get(
        process.env.REACT_APP_API + "/problem/" + values, {
            headers: {
                authtoken,
            },
        }
    );
  };

export const getProblem = async (authtoken, id) => {
    return await axios.get(
      process.env.REACT_APP_API + "/get-problem/" + id,
      {
        headers: {
          authtoken,
        },
      }
    );
  };
