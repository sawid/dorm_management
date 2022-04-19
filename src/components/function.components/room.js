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