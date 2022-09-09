import React from "react";
// import Address from "./component/Address";
import Registration from "./component/Registration";
// import BasicDetails from "./component/BasicDetails";
// import Age from './component/Age'
// import Dob from "./component/Dob";

import "./index.css";

const App = () => {
  

  return (
    <div className="App container">
      <h1 className="text-center mt-5">REACT JS MACHINE TEST</h1>
      <div className="app">
        {/* <BasicDetails /> */}
        <Registration/>
        {/* <Age/> */}
        {/* <Dob /> */}
        {/* <Address/> */}
      </div>
    </div>
  );
};

export default App;
