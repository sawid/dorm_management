import axios from "axios";

export const readBill = async (authtoken, values) => {
        return await axios.get(
          process.env.REACT_APP_API + "/bill/" + values,
          {
            headers: {
              authtoken,
            },
          }
        );
      };