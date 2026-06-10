import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://127.0.0.1:8000/me",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setUser(
          response.data
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to load profile"
        );
      }
    };

  if (!user) {

    return (
      <div className="page-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (

    <div className="page-container">

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        My Profile
      </h1>

      <div className="card">

        <h2>
          User Information
        </h2>

        <p>
          <b>ID:</b>
          {" "}
          {user.id}
        </p>

        <p>
          <b>Name:</b>
          {" "}
          {user.name}
        </p>

        <p>
          <b>Email:</b>
          {" "}
          {user.email}
        </p>

      </div>

    </div>
  );
}

export default Profile;