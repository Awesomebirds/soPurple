import Router from "Components/Router";
import { authService, firestoreService } from "myFirebase";
import { useEffect, useState } from "react";
// import Footer from "Components/Footer";

function App() {
  const [init, setInit] = useState(false);
  const [uid, setUid] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [cocktails, setCocktails] = useState([]);
  const [spirits, setSpirits] = useState([]);
  const [tags, setTags] = useState([]);

  //스피릿, 태그 로드
  const proofs = ["약함", "중간", "강함"];

  const checkManager = () => {
    if (uid) {
      if (uid === "lST7WLz2WDSCdctfFrZ2gMta9m93") {
        setIsManager(true);
      }
    }
  };

  const loadTags = async () => {
    const tagsRef = firestoreService.collection("tag");
    const docs = (await tagsRef.get()).docs;
    const docsArray = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTags(docsArray);
  };

  const loadSpirits = async () => {
    const spiritsRef = firestoreService.collection("spirit");
    const docs = (await spiritsRef.get()).docs;
    const docsArray = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSpirits(docsArray);
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        checkManager();
      } else {
        setUid(null);
      }
      setInit(true);
    });

    //칵테일 로드
    firestoreService.collection("cocktail").onSnapshot((snapshot) => {
      const cocktailArray = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setCocktails(cocktailArray);
    });
    //스피릿 태그 로드
    loadSpirits();
    loadTags();
  }, [uid]);

  return (
    init &&
    tags &&
    spirits && (
      <div className="App">
        <Router
          uid={uid}
          cocktails={cocktails}
          spirits={spirits}
          tags={tags}
          proofs={proofs}
          isManager={isManager}
        />
        {/* <Footer /> */}
      </div>
    )
  );
}

export default App;
