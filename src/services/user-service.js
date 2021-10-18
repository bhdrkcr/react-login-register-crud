import api from './api';
import axios, { patch } from 'axios';
import TokenService from "./token.service";

class UserService {
    getUserBoard() {
        return api.get('/users');
    }
    getUser(userId) {
        return api.get('/users/' + userId);
    }
    updateUser(userId, password, first_name, last_name, birth_date, avatar) {
        // const token = TokenService.getLocalaccess();
        // const url = 'http://localhost:8000/api/users/';
        if (avatar) {
            const formData = new FormData();
            formData.append('avatar', avatar)
            formData.append('first_name', first_name)
            formData.append('last_name', last_name)
            formData.append('birth_date', birth_date)
            return api.patch('/users/' + userId + "/", formData, {
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarygKfEkTZxVSwrQW1S'
            });
        } else {
            return api.patch('/users/' + userId + "/", {
                first_name,
                last_name,
                birth_date
            });
        }
    }
    deleteUser(userId) {
        return api.delete('/users/' + userId + "/");
    }
}

export default new UserService();