import { ParallaxProvider } from 'react-scroll-parallax';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { turnHome } from './redux/isHomePageSlice';
import { turnMobile } from './redux/isMobile';

// COMPONENTS
import Header from './components/Header';
import Navbar from './components/nav/Navbar';
import BrightnesseBtn from './components/buttons/BrightnesseBtn';
import WelcomeMsg from './components/WelcomeMsg';
import PostGrid from './components/post/PostGrid';
import WritePost from './components/post/WritePost';
import Footer from './components/Footer';
import LoadScreen from './components/LoadScreen';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // redux
  const isLoadingServer = useSelector((state) => state.isLoadingServer.value);
  const isHomePage = useSelector((state) => state.isHomePage.value);
  const isWritePost = useSelector((state) => state.isWritePost.value);
  const isMobile = useSelector((state) => state.isMobile.value);
  const fullUser = useSelector((state) => state.fullUser.value);

  const dispacth = useDispatch();

  // set is home page
  window.addEventListener('scroll', () => {
    if (window.scrollY >= window.innerHeight - 250) {
      dispacth(turnHome(false));
    } else if (window.scrollY < window.innerHeight + 250) {
      dispacth(turnHome(true));
    }
  });
  // set is mobile
  const checkIfMobile = () => {
    if (window.innerWidth < 800) {
      dispacth(turnMobile(true));
    } else if (window.innerWidth >= 800) {
      dispacth(turnMobile(false));
    }
  };
  useEffect(() => {
    checkIfMobile();
    dispacth(turnHome(true));
  }, []);
  window.addEventListener('resize', () => {
    checkIfMobile();
  });

  return (
    <>
      {isLoadingServer ? <LoadScreen /> : ''}
      {isWritePost ? <WritePost /> : ''}

      {isHomePage ? '' : <Navbar />}
      <ParallaxProvider>
        <Header />
      </ParallaxProvider>
      <div className="page">
        <BrightnesseBtn />
        {fullUser ? (
          <PostGrid />
        ) : (
          <div className="container">
            <WelcomeMsg />
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
