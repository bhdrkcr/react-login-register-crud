import {
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    SET_MESSAGE
} from "./types";

import UserService from "../services/user-service";

export const update = (id, password, first_name, last_name, birth_date, avatar) => (dispatch) => {
    return UserService.updateUser(id, password, first_name, last_name, birth_date, avatar).then(
        (response) => {
            dispatch({
                type: UPDATE_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: UPDATE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
