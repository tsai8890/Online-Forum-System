import { createContext, useContext, useState } from 'react';

const UserContext = createContext({
    me: '',
    setMe: () => {},

    isLogin: false,
    setIsLogin: () => {},

    UID: '',
    setUID: () => {}
});

const UserProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [me, setMe] = useState('');
    const [UID, setUID] = useState('');

    return (
        <UserContext.Provider
            value={{
                me, isLogin, setMe, setIsLogin, UID, setUID
            }}
            {...props}
        />
    )
}

const useUser = () => useContext(UserContext);
export { UserProvider, useUser };