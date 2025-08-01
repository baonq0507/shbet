
export const saveStorage = (key, value) => {
    if(typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
}

export const getStorage = (key) => {
    const value = localStorage.getItem(key);
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

export const removeStorage = (key) => {
    localStorage.removeItem(key);
}

export const clearStorage = () => {
    localStorage.clear();
}

export const clearConsole = () => {
    console.clear();
}


export const saveToken = (token) => {
    saveStorage(import.meta.env.VITE_KEY_TOKEN || 'token', token);
}

export const getToken = () => {
    return getStorage(import.meta.env.VITE_KEY_TOKEN || 'token');
}

export const removeToken = () => {
    removeStorage(import.meta.env.VITE_KEY_TOKEN || 'token');
}

export const clearToken = () => {
    clearStorage(import.meta.env.VITE_KEY_TOKEN || 'token');
}

export const saveUser = (user) => {
    saveStorage(import.meta.env.VITE_KEY_USER || 'user', user);
}

export const getUser = () => {
    return getStorage(import.meta.env.VITE_KEY_USER || 'user');
}

export const removeUser = () => {
    removeStorage(import.meta.env.VITE_KEY_USER || 'user');
}

export const clearUser = () => {
    clearStorage(import.meta.env.VITE_KEY_USER || 'user');
}

export const formatBalance = (balance) => {
    return balance.toLocaleString('vi-VN');
}

