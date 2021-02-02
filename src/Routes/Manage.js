import { storageService } from "myFirebase";
import { useState } from "react";

const Manage = () => {
  const [bannerFile, setBannerFile] = useState(null);

  const onBannerChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setBannerFile(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(file);
  };

  const onBannerSubmit = async (event) => {
    event.preventDefault();
    const storageRef = storageService.ref();
    const bannerRef = storageRef.child("banner/mainBanner");

    await bannerRef.putString(bannerFile, "data_url");
  };

  return (
    <>
      <h1>Manage Page</h1>
      <form onSubmit={onBannerSubmit}>
        <input type="file" accept="image/*" onChange={onBannerChange} />
        {bannerFile && <img src={bannerFile} width="50px" height="50px" />}
        <input type="submit" />
      </form>
    </>
  );
};

export default Manage;
