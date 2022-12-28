import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Login from './containers/Login';
import Register from './containers/register';
import Posts from './containers/Posts';
import Post from './containers/Post';
import CreatePost from './containers/CreatePost';
import UserPost from './containers/UserPost';
import Profile from './containers/Profile';

import { UserProvider } from './containers/hooks/useUser';
import Header from './containers/Header';

const sections = [
	{ title: 'Home', url: '/posts' },
	{ title: 'Profile', url: `/profile/UID`},
    
	// { title: 'Technology', url: '#' },
    // { title: 'Design', url: '#' },
    // { title: 'Culture', url: '#' },
    // { title: 'Business', url: '#' },
    // { title: 'Politics', url: '#' },
    // { title: 'Opinion', url: '#' },
    // { title: 'Science', url: '#' },
    // { title: 'Health', url: '#' },
    // { title: 'Style', url: '#' },
    // { title: 'Travel', url: '#' },
];

function App() {
  return (
    <UserProvider>
      <CssBaseline />
      <BrowserRouter>
        <Header title='NTU CSIE 論壇' sections={sections}></Header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />}/>
          <Route path="/post/:id" element={<Post />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/userposts/:id" element={<UserPost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/" element={<Posts />} />
          <Route path="*" element={<h1>Error, Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
