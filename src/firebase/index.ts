'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }

  // In a production environment (like Firebase App Hosting), the SDK is automatically
  // initialized using environment variables. In a local development environment, we
  // fall back to using the firebaseConfig object.
  let firebaseApp;
  try {
    firebaseApp = initializeApp();
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Firebase automatic initialization failed, falling back to firebaseConfig. This is normal in a local dev environment.', e);
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      console.warn('Firebase automatic initialization failed in production. Check your App Hosting environment variables.', e);
      // In production, if auto-init fails, we might still try the config as a last resort
      // depending on the intended setup, but it's usually an environment issue.
      firebaseApp = initializeApp(firebaseConfig);
    }
  }

  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
export { useUser } from './provider';