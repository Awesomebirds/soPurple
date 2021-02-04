import { firestoreService, storageService } from "myFirebase";
import { useEffect, useState } from "react";

const Manage = () => {
  const [bannerFile, setBannerFile] = useState(null);
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);
  const [spiritValue, setSpiritValue] = useState("");
  const [spirits, setSpirits] = useState([]);

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

  //Base Spirit
  const onSpiritChange = (event) => {
    event.preventDefault();
    setSpiritValue(event.target.value);
  };

  const onSpiritSubmit = (event) => {
    event.preventDefault();
    firestoreService.collection("spirit").add({
      name: spiritValue,
    });
    setSpiritValue("");
  };

  const onSpiritDelete = (id) => {
    const deleteSpirit = async () =>
      await firestoreService.doc(`spirit/${id}`).delete();
    if (window.confirm("스피릿을 정말 삭제하시겠습니까?? 진짜로?") === true) {
      deleteSpirit();
    } else {
      return;
    }
  };

  useEffect(() => {
    //tag snapshot
    firestoreService.collection("tag").onSnapshot((snapshot) => {
      const tagArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTags(tagArray);
    });

    //spirit snapshot
    firestoreService.collection("spirit").onSnapshot((snapshot) => {
      const spiritArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSpirits(spiritArray);
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
      <h2>스피릿 편집</h2>
      <form onSubmit={onSpiritSubmit}>
        <input
          type="text"
          placeholder="스피릿 이름"
          onChange={onSpiritChange}
          value={spiritValue}
        />
        <input type="submit" value="추가" />
      </form>
      {spirits &&
        spirits.map((spirit) => (
          <div>
            <span key={spirit.id}>{spirit.name}</span>
            <button key={spirit.name} onClick={() => onSpiritDelete(spirit.id)}>
              ❌
            </button>
          </div>
        ))}
    </>
  );
};

export default Manage;
