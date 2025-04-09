import Layout from "@/common/Layout";
import Header from "./Header/Header";
import CreateShop from "./CreateShop/CreateShop";
import React, { useState } from "react";
import { Snackbar } from "react-native-paper";
import { View } from "react-native";

const Home = () => {
  return (
    <>
    <Layout
     fullBody={true}
     barDark={true}
    // isScroll={step == 2 ? false : true}
      >
           <Header />
           <CreateShop/>
      </Layout>
    </>
  );
};

export default Home;
