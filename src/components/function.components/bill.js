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


export const readMonth = async(authtoken, id, values) => {
    return await axios.post(
        process.env.REACT_APP_API + "/bill/" + id, values, {
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

export const changePayStatus = async(authtoken, id, values) => {
    return await axios.post(
        process.env.REACT_APP_API + "/payStatus/" + id, values, {
            headers: {
                authtoken,
            },
        }
    );
};

export const sentNotificate = async(authtoken, values) => {
    return await axios.post(
        process.env.REACT_APP_API + "/line-send/", values, {
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