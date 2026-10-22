import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase web configuration is intentionally safe to expose in client code.
// Security is enforced by Firebase Authentication and project rules.
const firebaseConfig = {
  apiKey: 'AIzaSyBsuMv_T11TvJ3hHko3aXUJlqGFzEuqDI0',
  authDomain: 'bloaging.firebaseapp.com',
  projectId: 'bloaging',
  storageBucket: 'bloaging.firebasestorage.app',
  messagingSenderId: '722269312962',
  appId: '1:722269312962:web:2c8fe4ae2ec3ba3fb6685b',
  measurementId: 'G-TMRJQ1L9DR',
}

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
