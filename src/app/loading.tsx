"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const loadingMessages = [
  `Préparation des paris les plus fous...`,
  `Calcul des cotes improbables...`,
  `Révision des règles du jeu...`,
  `Échauffement des dés virtuels...`,
  `Mélange des cartes numériques...`,
  `Polissage des jetons virtuels...`,
  `Mise en place de la table de jeu...`,
  `Vérification de l'équité des paris...`,
  `Chargement de l'ambiance casino...`,
  `Préparation de votre chance du jour...`,
];

export default function LoadingPage() {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
      <div className="text-center">
        <motion.div
          className="mb-8"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <svg className="mx-auto size-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#EF4444" strokeWidth="8" />
            <path d="M50 10 L50 50 L75 75" fill="none" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </motion.div>
        <h1 className="mb-4 text-3xl font-bold text-red-800">{`Chargement en cours...`}</h1>
        <motion.p
          className="text-xl text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.p>
      </div>
      <div className="mt-12">
        <motion.div
          className="h-2 w-48 overflow-hidden rounded-full bg-red-200"
          initial={{ width: 0 }}
          animate={{ width: "12rem" }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="h-full bg-red-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
