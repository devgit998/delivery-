/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export type UserRole = "user" | "admin" | "super_admin";

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserRole: (uid: string, newRole: UserRole) => Promise<void>;
  getAllUsers: () => Promise<UserData[]>;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is admin or super admin
  const isAdmin = (): boolean => {
    return userData?.role === "admin" || userData?.role === "super_admin";
  };

  // Check if user is super admin
  const isSuperAdmin = (): boolean => {
    return userData?.role === "super_admin";
  };

  // Fetch user data from Firestore
  const fetchUserData = async (uid: string): Promise<UserData | null> => {
    try {
      console.log("🔍 Fetching user data for UID:", uid);
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("✅ User data found:", userDoc.data());
        return userDoc.data() as UserData;
      }
      console.log("⚠️ No user data found in Firestore for UID:", uid);
      return null;
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
      return null;
    }
  };

  // Get all users (for super admin)
  const getAllUsers = async (): Promise<UserData[]> => {
    try {
      if (!isSuperAdmin()) {
        throw new Error("Unauthorized: Only super admins can view all users");
      }

      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList: UserData[] = [];

      usersSnapshot.forEach((doc) => {
        usersList.push(doc.data() as UserData);
      });

      return usersList;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  };

  // Update user role (super admin only)
  const updateUserRole = async (uid: string, newRole: UserRole): Promise<void> => {
    try {
      if (!isSuperAdmin()) {
        throw new Error("Unauthorized: Only super admins can update roles");
      }

      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, {
        role: newRole,
      });

      console.log(`User ${uid} role updated to ${newRole}`);
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  };

  // Create user document in Firestore
  const createUserDocument = async (
    user: User,
    displayName?: string,
    role: UserRole = "user"
  ) => {
    try {
      console.log("🔵 Starting createUserDocument for UID:", user.uid);
      console.log("🔵 Display name:", displayName || user.displayName);
      console.log("🔵 Email:", user.email);
      
      const userDocRef = doc(db, "users", user.uid);
      console.log("🔵 User document reference created");
      
      // Check if this is the first user - make them super admin
      console.log("🔵 Checking if this is the first user...");
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const isFirstUser = usersSnapshot.empty;
      console.log("🔵 Is first user:", isFirstUser);

      const userData: UserData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.displayName,
        role: isFirstUser ? "super_admin" : role,
        createdAt: new Date().toISOString(),
      };

      console.log("🔵 User data to be saved:", userData);
      console.log("🔵 Attempting to save to Firestore...");
      
      await setDoc(userDocRef, userData);
      
      console.log("✅ User document created successfully in Firestore!");
      return userData;
    } catch (error) {
      console.error("❌ Error creating user document:", error);
      console.error("❌ Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("🔐 Signing in user:", email);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Sign in successful");
    } catch (error: any) {
      console.error("❌ Sign in error:", error);
      throw new Error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      console.log("📝 Starting sign up process...");
      console.log("📝 Email:", email);
      console.log("📝 Display Name:", displayName);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Firebase Auth account created:", userCredential.user.uid);
      
      // Update profile with display name
      console.log("📝 Updating user profile with display name...");
      await updateProfile(userCredential.user, { displayName });
      console.log("✅ User profile updated");

      // Create user document in Firestore
      console.log("📝 Creating user document in Firestore...");
      await createUserDocument(userCredential.user, displayName);
      console.log("✅ Sign up process complete!");
    } catch (error: any) {
      console.error("❌ Sign up error:", error);
      throw new Error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      console.log("🔐 Starting Google sign in...");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Google sign in successful:", result.user.uid);
      
      // Check if user document exists, create if not
      const existingUserData = await fetchUserData(result.user.uid);
      if (!existingUserData) {
        console.log("📝 No existing user data, creating new document...");
        await createUserDocument(result.user);
      } else {
        console.log("✅ User data already exists");
      }
    } catch (error: any) {
      console.error("❌ Google sign in error:", error);
      throw new Error(error.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  // Sign in with GitHub
  const signInWithGithub = async () => {
    try {
      setLoading(true);
      console.log("🔐 Starting GitHub sign in...");
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("✅ GitHub sign in successful:", result.user.uid);
      
      // Check if user document exists, create if not
      const existingUserData = await fetchUserData(result.user.uid);
      if (!existingUserData) {
        console.log("📝 No existing user data, creating new document...");
        await createUserDocument(result.user);
      } else {
        console.log("✅ User data already exists");
      }
    } catch (error: any) {
      console.error("❌ GitHub sign in error:", error);
      throw new Error(error.message || "Failed to sign in with GitHub");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      console.log("👋 Logging out...");
      await signOut(auth);
      setUserData(null);
      router.push("/auth/sign-in");
      console.log("✅ Logout successful");
    } catch (error: any) {
      console.error("❌ Logout error:", error);
      throw new Error(error.message || "Failed to logout");
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    console.log("👂 Setting up auth state listener...");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("🔄 Auth state changed. User:", user?.uid || "null");
      setUser(user);
      
      if (user) {
        const data = await fetchUserData(user.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => {
      console.log("🛑 Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    userData,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    logout,
    updateUserRole,
    getAllUsers,
    isAdmin,
    isSuperAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};