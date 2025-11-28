import { userStorage } from '../storage';

// Static users data
const users = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123456",
    name: "Admin User",
    role: "admin"
  },
  {
    id: 2,
    email: "user@example.com",
    password: "123456",
    name: "Regular User",
    role: "user"
  }
];

class AuthServices {
    async signUp(payload) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const existingUser = users.find(u => u.email === payload.email);
                if (existingUser) {
                    reject(new Error('User already exists'));
                    return;
                }
                const newUser = {
                    id: users.length + 1,
                    ...payload,
                    role: 'user'
                };
                users.push(newUser);
                resolve(newUser);
            }, 500);
        });
    }

    async login(payload) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = users.find(u => u.email === payload.email && u.password === payload.password);
                if (!user) {
                    reject(new Error('Invalid credentials'));
                    return;
                }
                resolve(user);
            }, 500);
        });
    }

    async getMe() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const id = userStorage.get();
                const user = users.find(u => u.id === parseInt(id));
                resolve(user);
            }, 200);
        });
    }
}

export default new AuthServices;