import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query, doc, Query, DocumentReference, DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

const app = initializeApp(environment.firebase);
export const db = getFirestore(app);
export const storage = getStorage(app);

export function collectionData<T>(q: Query, options: { idField?: string } = {}): Observable<T[]> {
  return new Observable<T[]>((subscriber) => {
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
      const data = snapshot.docs.map((doc) => {
        const item = doc.data() as T;
        if (options.idField) {
          (item as any)[options.idField] = doc.id;
        }
        return item;
      });
      subscriber.next(data);
    }, (error) => {
      subscriber.error(error);
    });
    return () => unsubscribe();
  });
}

export function docData<T>(docRef: DocumentReference, options: { idField?: string } = {}): Observable<T> {
  return new Observable<T>((subscriber) => {
    const unsubscribe = onSnapshot(docRef, (snapshot: DocumentSnapshot) => {
      if (snapshot.exists()) {
        const item = snapshot.data() as T;
        if (options.idField) {
          (item as any)[options.idField] = snapshot.id;
        }
        subscriber.next(item);
      } else {
        subscriber.error(new Error('Document does not exist'));
      }
    }, (error) => {
      subscriber.error(error);
    });
    return () => unsubscribe();
  });
}
