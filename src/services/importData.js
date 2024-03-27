import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import jsonData from "../data.json";

export async function loadGroupsData() {
  const groupsCollection = collection(db, "agrupaciones");

  for (const group of jsonData.agrupaciones) {
    const groupId = group.ID;
    const groupDocRef = doc(groupsCollection, groupId);

    const groupDataWithoutID = { ...group };
    delete groupDataWithoutID.ID;

    await setDoc(groupDocRef, groupDataWithoutID);
    console.log(`Group with ID ${group.ID} added to the database.`);
  }
}
