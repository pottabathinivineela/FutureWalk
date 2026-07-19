import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function getUserData(uid: string) {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
        return snap.data();
    }

    return null;
}