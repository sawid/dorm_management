import axios from "axios";

export const readBill = async(authtoken, values) => {
    return await axios.get(
        process.env.REACT_APP_API + "/bill/" + values, {
            headers: {
                authtoken,
            },
        }
    );
};

export const listBill = async(authtoken) => {
    return await axios.get(
        process.env.REACT_APP_API + "/bill/", {
            headers: {
                authtoken,
            },
        }
    );
};

export const changeBillNet = async(authtoken, values) => {
    return await axios.put(
        process.env.REACT_APP_API + "/bill/" + values, {
            headers: {
                authtoken,
            },
        }
    );
};

export const resetVaule = async(authtoken, id, values) => {
    return await axios.put(
        process.env.REACT_APP_API + "/bill/" + id, values, {
            headers: {
                authtoken,
            },
        }
    );
};