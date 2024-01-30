import axios from "axios";
import React from "react";

const RenderUser = () => {
  const [user, setUser] = React.useState([]);
  const callAPIUser = async () => {
    const dataRes = await axios.get("http://localhost:8800/api/v1/user");
    console.log(dataRes);
    setUser(dataRes.data.data);
  };

  React.useEffect(() => {
    callAPIUser();
  }, []);

  return (
    <div>{user.length > 0 && user.map((i) => <div>{i.user_name}</div>)}</div>
  );
};

export default RenderUser;
