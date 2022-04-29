import './App.css';
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import MyNavBar from "./features/common/header";
import {useState} from "react";
import {getLocalStorage, USER_KEY, USER_SAVE_KEY} from "./services/localStorage.service";
import {contextPrototype} from "./services/usersContext.service";
import {UserContext} from "./services/usersContext.service"
import LoginContainer from "./features/login/container/login.container";
import Logout from "./features/login/container/logout.container";
import Home from "./features/home/home";
import NewAccountContainer from "./features/login/container/new-account.container";
import ArticleDetailContainer from "./features/article-detail/container/article-detail.container";
import Footer from "./features/common/footer";

function App() {

    const [user, setUser] = useState(getLocalStorage(USER_KEY));
    const [userSave, setUserSave] = useState(getLocalStorage(USER_SAVE_KEY));

    contextPrototype.user = user;
    contextPrototype.setUser = setUser;

    contextPrototype.userSave = userSave;
    contextPrototype.setUserSave = setUserSave;

    return (
        <UserContext.Provider value={ contextPrototype }>
            <MyNavBar/>
            <main>
              <ToastContainer hideProgressBar/>

              <Routes>
                  <Route path="/" element={ <Home/> }/>
                  <Route path="login" element={ <LoginContainer/> }/>
                  <Route path="logout" element={ <Logout setUser={ setUser } setUserSave={ setUserSave }/> }/>
                  <Route path="/creation/compte" element={ <NewAccountContainer/> }/>
                  <Route path="/article" element={ <ArticleDetailContainer/> }/>
              </Routes>

            </main>
            <Footer/>
        </UserContext.Provider>
    );
}

export default App;
