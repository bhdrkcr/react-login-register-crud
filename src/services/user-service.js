import api from './api';

class UserService {
    getUserBoard() {
        return api.get('/users');
    }
    getUser(userId) {
        return api.get('/users/' + userId);
    }
    updateUser(userId, password, first_name, last_name, birth_date, avatar) {
        return api.patch('/users/' + userId + "/", {
            password,
            first_name,
            last_name,
            birth_date
        });
    }
    deleteUser(userId) {
        return api.delete('/users/' + userId + "/");
    }
}

export default new UserService();