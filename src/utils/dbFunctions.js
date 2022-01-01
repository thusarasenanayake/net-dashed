import { doc, setDoc } from '@firebase/firestore';
import { db } from './firebase';
import Localbase from 'localbase';

const addUserRecordFB = async (id, object) => {
  try {
    await setDoc(doc(db, 'users', id), object);
  } catch (e) {
    console.table(e);
  }
};

const addUserRecordIDB = (id, object) => {
  const db = new Localbase('net-dashed');

  db.collection(id)
    .get()
    .then((settings) => {
      if (settings.length < 1) {
        db.collection(id).add(object);
      } else {
        db.collection(id).set([object]);
      }
    });
};

export { addUserRecordFB, addUserRecordIDB };
