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





export const resetVaule = async (authtoken, id, values) => {
    return await axios.put(
      process.env.REACT_APP_API + "/room/" + id, values,
      {
        headers: {
          authtoken,
        },
      }
    );
  }; 




// Not Use  
/*
export const resetRentalFee = async (authtoken, id, values) => {
    return await axios.put(
      process.env.REACT_APP_API + "/room-fee/" + id, values,
      {
        headers: {
          authtoken,
        },
      }
    );
  }; 

export const resetPhoneNumber = async (authtoken, id, values) => {
    return await axios.put(
      process.env.REACT_APP_API + "/room-phone-number/" + id, values,
      {
        headers: {
          authtoken,
        },
      }
    );
  }; 

  export const resetRoomType = async (authtoken, id, values) => {
    return await axios.put(
      process.env.REACT_APP_API + "/room-type/" + id, values,
      {
        headers: {
          authtoken,
        },
      }
    );
  };   

  export const resetNameRenter = async (authtoken, id, values) => {
    return await axios.put(
      process.env.REACT_APP_API + "/room-name-renter/" + id, values,
      {
        headers: {
          authtoken,
        },
      }
    );
  };
  */ 