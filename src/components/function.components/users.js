import axios from "axios";

export const listUser = async (authtoken) => {
        return await axios.get(
          process.env.REACT_APP_API + "/users",
          {
            headers: {
              authtoken,
            },
          }
        );
      };

export const listAUser = async (authtoken, id) => {
        return await axios.get(
          process.env.REACT_APP_API + "/users/" + id,
          {
            headers: {
              authtoken,
            },
          }
        );
      };

export const changeStatus = async (authtoken, value) => {
        return await axios.post(
          process.env.REACT_APP_API + "/change-status", value,
          {
            headers: {
              authtoken,
            },
          }
        );
      };

export const changeRole = async (authtoken, value) => {
        return await axios.post(
          process.env.REACT_APP_API + "/change-role", value,
          {
            headers: {
              authtoken,
            },
          }
        );
      };

export const removeUser = async (authtoken, id) => {
        return await axios.delete(
          process.env.REACT_APP_API + "/users/" + id,
          {
            headers: {
              authtoken,
            },
          }
        );
      };

export const resetPassword = async (authtoken, id, values) => {
        return await axios.put(
          process.env.REACT_APP_API + "/users/" + id, values,
          {
            headers: {
              authtoken,
            },
          }
        );
      };

export const changeFirstname = async (authtoken, id, value) => {
        return await axios.put(
          process.env.REACT_APP_API + "/change-firstname/" + id, value,
          {
            headers: {
              authtoken,
            },
          }
        );
      };

export const changeLastname = async (authtoken, id, value) => {
        return await axios.put(
          process.env.REACT_APP_API + "/change-lastname/" + id, value,
          {
            headers: {
              authtoken,
            },
          }
        );
      };

export const changeTelnumber = async (authtoken, id, value) => {
        return await axios.put(
          process.env.REACT_APP_API + "/change-telnumber/" + id, value,
          {
            headers: {
              authtoken,
            },
          }
        );
      };

export const changeEmail = async (authtoken, id, value) => {
        return await axios.put(
          process.env.REACT_APP_API + "/change-email/" + id, value,
          {
            headers: {
              authtoken,
            },
          }
        );
      };

export const changeCellnumber = async (authtoken, id, value) => {
        return await axios.put(
          process.env.REACT_APP_API + "/change-cellnumber/" + id, value,
          {
            headers: {
              authtoken,
            },
          }
        );
      };