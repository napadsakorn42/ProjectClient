import Head from "next/head";
import MainLayout from "../components/layout";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import withAuth from "../components/withAuth";
import config from "../config/config";

const Profile = ({ token }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    profileUser();
  }, []);

  const profileUser = async () => {
    try {
      // console.log('token: ', token)
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log('user: ', users.data)
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainLayout>
      <Head>
        <title className="text-red-700">User profile</title>
      </Head>
      <div className={styles.container}>
        <h1 className="text-red-700">User profile</h1>
        <div>
          <b className="text-red-700">Token:</b> {token.substring(0, 15)}...{" "}
          <br />
          <br />
          This route is protected by token, user is required to login first.
          <br />
          Otherwise, it will be redirect to Login page
          <br />
          <br />
          {JSON.stringify(user)}
        </div>
      </div>
    </MainLayout>
  );
};

export default withAuth(Profile);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
