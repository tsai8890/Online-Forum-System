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

    status: {},
    setStatus: () => {}
});

const UserProvider = (props) => {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [UID, setUID] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [status, setStatus] = useState({});

    return (
        <UserContext.Provider
            value={{
                username, nickname, UID, isLogin, status,
                setUsername, setNickname, setUID, setIsLogin, setStatus
            }}
            {...props}
        />
    )
}

const useUser = () => useContext(UserContext);
export { UserProvider, useUser };