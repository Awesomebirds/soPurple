import { firestoreService, storageService } from "myFirebase";
import { useEffect, useState } from "react";

const Manage = () => {
  const [bannerFile, setBannerFile] = useState(null);
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);

  //Banner
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

  //Tag
  const onTagChange = (event) => {
    event.preventDefault();
    setTagValue(event.target.value);
  };

  const onTagSubmit = (event) => {
    event.preventDefault();
    firestoreService.collection("tag").add({
      name: tagValue,
      cocktails: [],
    });
    setTagValue("");
  };

  const onTagDelete = (id) => {
    const deleteTag = async () =>
      await firestoreService.doc(`tag/${id}`).delete();
    if (window.confirm("태그를 정말 삭제하시겠습니까?? 진짜로?") === true) {
      deleteTag();
    } else {
      return;
    }
  };

  useEffect(() => {
    firestoreService.collection("tag").onSnapshot((snapshot) => {
      const tagArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTags(tagArray);
    });
  }, []);

  return (
    <>
      <h1>Manage Page</h1>
      <h2>배너 편집</h2>
      <form onSubmit={onBannerSubmit}>
        <input type="file" accept="image/*" onChange={onBannerChange} />
        {bannerFile && <img src={bannerFile} width="50px" height="50px" />}
        <input type="submit" />
      </form>
      <h2>태그 편집</h2>
      <form onSubmit={onTagSubmit}>
        <input
          type="text"
          placeholder="태그 이름"
          onChange={onTagChange}
          value={tagValue}
        />
        <input type="submit" value="추가" />
      </form>
      {tags &&
        tags.map((tag) => (
          <div>
            <span key={tag.id}>{tag.name}</span>
            <button key={tag.name} onClick={() => onTagDelete(tag.id)}>
              ❌
            </button>
          </div>
        ))}
    </>
  );
};

export default Manage;
