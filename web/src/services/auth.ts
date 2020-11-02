import api from './api';

interface Response {
    user: {
        name: string,
        email: string
    },
    token: string
}

interface loginData {
    email: string;
    password: string;
}

export default async function signIn(loginData: loginData): Promise<Response> {
    const { email, password } = loginData;
    const response = await api.post('/session', {
        email: email, 
        password: password
    });

    return response.data;
} 