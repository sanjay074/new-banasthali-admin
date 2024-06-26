import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Account from "./pages/account/Account";
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AccountList from "./pages/accountList/AccountList";

import {useEffect} from "react";
import axios from 'axios';
import { Edit } from "@mui/icons-material";
import Editstudent from "./pages/editStudent/Editstudent";

// export let navRef;
function App() {
  const { darkMode } = useContext(DarkModeContext);
//token

//token
  // const nav = useNavigate();
  // const tokenstatus = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;
  //   await axios
  //     .get("http://localhost:5000/api/auth/tokenstatus", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       if (res?.data?.data === false) {
  //         localStorage.removeItem("token");
  //         nav("/");
  //       }
  //     });
  // };

  // useEffect(() => {
  //   tokenstatus();
  //   const timer = setInterval(() => {
  //     tokenstatus();
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login/>} />
            <Route path="/dashboard" element={<Home />} />
          </Route>
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New Student" />}
              />
            </Route>
            <Route path="/account" element={<Account/>}/>
            <Route path="/accountList" element={<AccountList/>}/>
            <Route path="/updateStudent/:id" element={<Editstudent/>}/>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
