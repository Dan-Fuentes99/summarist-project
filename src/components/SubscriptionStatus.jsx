import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


export async function getSubscriptionStatus(user) {
  if (!user) return "basic";

  const idTokenResult = await user.getIdTokenResult(true);
  if (idTokenResult?.claims?.premium) return "premium";

  const docRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(docRef);
  if (userSnap.exists() && userSnap.data().subscription === "premium") {
    return "premium";
  }
  return "basic";
}
