import axios from 'axios'

export const register = async(value) =>
        await axios.post(process.env.REACT_APP_API + "/register", value);
