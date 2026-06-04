"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProgress, saveProgress } from "@/lib/progressService";

interface ProgressContextType {
  completedItems: Set<string>;
  toggleItem: (id: string, isCompleted?: boolean) => void;
  toggleMultipleItems: (items: Record<string, boolean>) => void;
  isCompleted: (id: string) => boolean;
  isLoadingProgress: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const { user, loading: authLoading } = useAuth();

  // Load data dari Firestore atau LocalStorage saat pertama kali mount atau user berubah
  useEffect(() => {
    // Jangan lakukan apa-apa jika autentikasi masih loading
    if (authLoading) return;

    let isMounted = true;
    
    const loadProgress = async () => {
      setIsLoadingProgress(true);
      
      if (user) {
        // Load dari Firestore jika user sedang login
        try {
          const firestoreProgress = await getProgress(user.uid);
          if (isMounted) {
            setCompletedItems(new Set(firestoreProgress));
            // Sinkronkan ke local storage juga sebagai backup/cache
            localStorage.setItem("vocatrack-progress", JSON.stringify(firestoreProgress));
          }
        } catch (error) {
          console.error("Failed to load progress from Firestore", error);
        }
      } else {
        // Fallback ke localStorage jika tidak login (guest mode)
        const saved = localStorage.getItem("vocatrack-progress");
        if (saved && isMounted) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              setCompletedItems(new Set(parsed));
            }
          } catch (e) {
            console.error("Failed to parse progress from local storage", e);
          }
        } else if (isMounted) {
          // Reset jika tidak ada data sama sekali
          setCompletedItems(new Set());
        }
      }
      
      if (isMounted) {
        setIsLoadingProgress(false);
      }
    };

    loadProgress();

    return () => {
      isMounted = false;
    };
  }, [user, authLoading]);

  // Fungsi toggle item yang otomatis menyimpan ke Firestore dan LocalStorage
  const toggleItem = useCallback((id: string, forceStatus?: boolean) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (forceStatus !== undefined) {
        if (forceStatus) newSet.add(id);
        else newSet.delete(id);
      } else {
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
      }
      
      // Selalu simpan ke local storage sebagai backup real-time
      localStorage.setItem("vocatrack-progress", JSON.stringify(Array.from(newSet)));

      // Simpan ke Firestore secara asinkron jika user login
      if (user) {
        saveProgress(user.uid, newSet).catch(err => {
          console.error("Failed to save progress to Firestore", err);
        });
      }

      return newSet;
    });
  }, [user]);

  const toggleMultipleItems = useCallback((items: Record<string, boolean>) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      Object.entries(items).forEach(([id, forceStatus]) => {
        if (forceStatus) newSet.add(id);
        else newSet.delete(id);
      });
      
      localStorage.setItem("vocatrack-progress", JSON.stringify(Array.from(newSet)));

      if (user) {
        saveProgress(user.uid, newSet).catch(err => {
          console.error("Failed to save progress to Firestore", err);
        });
      }

      return newSet;
    });
  }, [user]);

  const isCompleted = useCallback((id: string) => completedItems.has(id), [completedItems]);

  return (
    <ProgressContext.Provider value={{ completedItems, toggleItem, toggleMultipleItems, isCompleted, isLoadingProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
