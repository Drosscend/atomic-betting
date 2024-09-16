"use client";

import { ArrowRightIcon, MessageCircleIcon, RocketIcon, UsersIcon, ZapIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const steps = [
  {
    title: `Créez votre profil`,
    description: `Personnalisez votre expérience`,
    icon: UsersIcon,
    detailedDescription: `Commencez par créer votre profil unique sur Atomic Betting. Choisissez un pseudo accrocheur, ajoutez une photo de profil qui vous représente, et personnalisez vos paramètres. C'est votre identité de parieur virtuel, alors amusez-vous !`,
  },
  {
    title: `Rejoignez une équipe`,
    description: `Ou créez la vôtre`,
    icon: UsersIcon,
    detailedDescription: `Les équipes sont au cœur de l'expérience Atomic Betting. Rejoignez une équipe existante pour participer à des paris de groupe, ou créez la vôtre et invitez vos amis. C'est l'occasion de former votre propre communauté de parieurs virtuels !`,
  },
  {
    title: `Placez votre premier pari`,
    description: `Sans risque, juste pour le fun`,
    icon: ZapIcon,
    detailedDescription: `Il est temps de se lancer ! Parcourez les paris disponibles et choisissez celui qui vous intrigue le plus. Pas d'inquiétude, tout est virtuel ici. Analysez, faites vos prédictions, et placez votre premier pari. Qui sait, vous serez peut-être le grand gagnant !`,
  },
  {
    title: `Invitez vos amis`,
    description: `C'est plus drôle ensemble`,
    icon: MessageCircleIcon,
    detailedDescription: `Atomic Betting est encore plus amusant avec des amis ! Invitez vos proches à rejoindre votre équipe. Défiez-les, créez des paris personnalisés, et voyez qui a le meilleur instinct de parieur. Plus on est de fous, plus on rit !`,
  },
];

export default function WelcomePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/team");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-center text-5xl font-extrabold tracking-tight text-red-900 lg:text-6xl">
          Bienvenue sur <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Atomic Betting</span> !
        </h1>

        <Card className="mb-8 overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 text-white">
            <CardTitle className="text-2xl">{`Prêt à commencer votre aventure ?`}</CardTitle>
            <CardDescription className="text-red-100">{`Suivez ces étapes simples pour débuter avec Atomic Betting`}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 ${index === currentStep ? "text-red-700" : "text-gray-600"} ${index <= currentStep ? "cursor-pointer hover:text-red-600" : ""}`}
                  onClick={() => index <= currentStep && handleStepClick(index)}
                >
                  <div className={`rounded-full p-2 ${index === currentStep ? "bg-red-100" : "bg-gray-100"}`}>
                    <step.icon className="size-6" />
                  </div>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm">{step.description}</p>
                    {index === currentStep && <p className="mt-2 rounded-md bg-red-50 p-3 text-sm text-gray-600">{step.detailedDescription}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 overflow-hidden shadow-lg">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-red-700">{`Votre progression`}</span>
              <span className="text-sm font-medium text-gray-600">{`Étape ${currentStep + 1} sur ${steps.length}`}</span>
            </div>
            <div className="relative pt-1">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <span className="inline-block rounded-full bg-red-200 px-2 py-1 text-xs font-semibold uppercase text-red-600">{`En cours`}</span>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-semibold text-red-600">{`${Math.round(((currentStep + 1) / steps.length) * 100)}%`}</span>
                </div>
              </div>
              <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2 w-full bg-red-200" />
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 flex items-center justify-between">
          <p className="text-gray-600">
            {`Besoin d'aide ? Consultez notre `}
            <a href="/faq" className="font-medium text-red-600 hover:underline">
              {`FAQ`}
            </a>
          </p>
          <Button
            onClick={handleNextStep}
            className="rounded-full bg-gradient-to-r from-red-500 to-red-700 px-6 py-2 text-white transition duration-300 hover:shadow-lg"
          >
            {currentStep === steps.length - 1 ? `C'est parti !` : `Étape suivante`}
            <ArrowRightIcon className="ml-2 size-4" />
          </Button>
        </div>

        <Card className="mb-8 overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 text-white">
            <CardTitle className="flex items-center">
              <RocketIcon className="mr-2 size-6" />
              {`Le saviez-vous ?`}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="italic text-gray-600">
              {`Atomic Betting a été créé par des étudiants qui cherchaient à pimenter leurs cours moins passionnants. Aujourd'hui, c'est une plateforme qui rassemble des milliers de parieurs virtuels !`}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
