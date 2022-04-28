import axios from "axios";

export const listBills = async (authtoken) => {
        return await axios.get(
          process.env.REACT_APP_API + "/bill",
          {
            headers: {
              authtoken,
            },
          }
        );
      };
    
export const createBill = async(authtoken, values) => {
  return await axios.post(
      process.env.REACT_APP_API + "/bill/" ,values, {
          headers: {
              authtoken,
          },
      }
  );
};
export const getRoomName = async(authtoken, values) => {
  return await axios.get(
      process.env.REACT_APP_API + "/get-room-name/" + values, {
          headers: {
              authtoken,
          },
      }
  );
};