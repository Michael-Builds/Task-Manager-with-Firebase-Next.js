'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    const signUpPromise = createUserWithEmailAndPassword(auth, email, password);

    toast.promise(
      signUpPromise,
      {
        loading: 'Creating your account...',
        success: 'Account created successfully! Welcome! 🎉',
        error: (error) => {
          if (error.code === 'auth/email-already-in-use') {
            return 'This email is already registered. Try signing in instead.';
          }
          if (error.code === 'auth/weak-password') {
            return 'Password is too weak. Please use at least 6 characters.';
          }
          if (error.code === 'auth/invalid-email') {
            return 'Please enter a valid email address.';
          }
          return 'Failed to create account. Please try again.';
        }
      }
    );

    return signUpPromise;
  };

  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    const signInPromise = signInWithEmailAndPassword(auth, email, password);

    toast.promise(
      signInPromise,
      {
        loading: 'Signing you in...',
        success: 'Welcome back! 👋',
        error: (error) => {
          if (error.code === 'auth/user-not-found') {
            return 'No account found with this email. Try signing up instead.';
          }
          if (error.code === 'auth/wrong-password') {
            return 'Incorrect password. Please try again.';
          }
          if (error.code === 'auth/invalid-email') {
            return 'Please enter a valid email address.';
          }
          if (error.code === 'auth/too-many-requests') {
            return 'Too many failed attempts. Please try again later.';
          }
          return 'Failed to sign in. Please check your credentials.';
        }
      }
    );

    return signInPromise;
  };

  const logout = async (): Promise<void> => {
    const logoutPromise = signOut(auth);

    toast.promise(
      logoutPromise,
      {
        loading: 'Signing you out...',
        success: 'Signed out successfully. See you later! 👋',
        error: 'Failed to sign out. Please try again.'
      }
    );

    return logoutPromise;
  };

  const value: AuthContextType = {
    user,
    signUp,
    signIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
