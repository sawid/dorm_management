import axios from "axios";

export const listAnnoucement = async(authtoken) => {
        return await axios.get(
            process.env.REACT_APP_API + "/annoucement/", {
                headers: {
                    authtoken,
                },
            }
        );
    };

export const createAnnoucement = async (authtoken, data) => {
    return await axios.post(
      process.env.REACT_APP_API + "/annoucement/",
      data,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const numberDashboardTop = async (authtoken) => {
  return await axios.get(
    process.env.REACT_APP_API + "/dashboardtopbar/",
    {
      headers: {
        authtoken,
      },
    }
  );
};
