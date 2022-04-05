import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header/Header";
import Messages from "./messages/Messages";
import HeaderForUser from "./profile/headerForUser/HeaderForUser";
import Profile from "./profile/Profile";
import Ribbon from "./ribbon/Ribbon";
import Saved from "./saved/Saved";
import SignIn from "./singIn&singUp/signIn/SignIn";
import SignUp from "./singIn&singUp/signUp/SignUp";
import { getUser } from "../redux/features/application";
import EditProfile from "./EditProfile/EditProfile";
import Posts from "./profile/posts/Posts/Posts";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { token } = useSelector((state) => state.application);

  if (token) {
    return (
      <div>
        <div>
          <Header />
          <div className="App">
            <Routes>
              <Route path="/messages" element={<Messages />} />
              <Route path="/" element={<Profile />} />
              <Route path="/instafeed" element={<Ribbon />} />
              <Route path="/signin" element={<Navigate to="/" replace />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route
                path="/saves"
                element={
                  <>
                    <HeaderForUser /> <Saved />
                  </>
                }
              />
              <Route
                path="/public"
                element={
                  <>
                    <HeaderForUser /> <Posts />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        {/* <Header /> */}
        <div className="App">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Navigate to="/signin" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
