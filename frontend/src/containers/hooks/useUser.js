import { createContext, useContext, useState } from 'react';

const UserContext = createContext({
    username: '',
    setUsername: () => {},

    nickname: '',
    setNickname: () => {},

    UID: '',
    setUID: () => {},

    isLogin: false,
    setIsLogin: () => {},
});

const UserProvider = (props) => {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [UID, setUID] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    return (
        <UserContext.Provider
            value={{
                username, nickname, UID, isLogin, 
                setUsername, setNickname, setUID, setIsLogin
            }}
            {...props}
        />
    )
}

const useUser = () => useContext(UserContext);
export { UserProvider, useUser };