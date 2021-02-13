import { storageService } from "myFirebase";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

//styles
const Container = styled.div`
  width: 100%;
  background-color: gray;
  &::after {
    content: "";
    display: block;
    padding-bottom: 56.25%;
  }
  background-image: url(${(props) => props.banner});
  background-size: cover;
  background-position: center;
`;

const Banner = () => {
  const [banner, setBanner] = useState(null);

  //logic
  const downloadBanner = async () => {
    const bannerRef = storageService.ref("banner/mainBanner");
    const url = await bannerRef.getDownloadURL();
    setBanner(url);
  };

  useEffect(() => {
    downloadBanner();
  }, []);
  return <Container banner={banner}></Container>;
};

export default Banner;
