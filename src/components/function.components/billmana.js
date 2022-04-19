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