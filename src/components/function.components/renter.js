import axios from "axios";

export const readRenter = async(authtoken, values) => {
    return await axios.get(
        process.env.REACT_APP_API + "/renter/" + values, {
            headers: {
                authtoken,
            },
        }
    );
};

export const listRenter = async(authtoken) => {
    return await axios.get(
        process.env.REACT_APP_API + "/renter/" , {
            headers: {
                authtoken,
            },
        }
    );
};


export const createRenter = async (authtoken, data) => {
    return await axios.post(
      process.env.REACT_APP_API + "/renter/",
      data,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const resetValueRenter = async (authtoken, id, values) => {
    return await axios.put(
      process.env.REACT_APP_API + "/renter/" + id, values,
      {
        headers: {
          authtoken,
        },
      }
    );
  }; 


export const getRenterRoom = async (authtoken, id) => {
  return await axios.get(
    process.env.REACT_APP_API + "/getRenter/" + id,
    {
      headers: {
        authtoken,
      },
    }
  );
}; 



export const removeRenter = async (authtoken, id) => {
      return await axios.delete(
        process.env.REACT_APP_API + "/renter/" + id,
        {
          headers: {
            authtoken,
          },
        }
      );
    };
export const putRenterRoom = async (authtoken, id , values) => {
  return await axios.put(
    process.env.REACT_APP_API + "/putRenter/" + id ,values,
    {
      headers: {
        authtoken,
      },
    }
  );
}; 
