import { createContext, useContext, useState } from 'react';

const UserContext = createContext({
    me: '',
    signedIn: false,
});

const UserProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [me, setMe] = useState('');

    return (
        <UserContext.Provider
            value={{
                me, isLogin, setMe, setIsLogin,
            }}
            {...props}
        />
    )
    
}

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };