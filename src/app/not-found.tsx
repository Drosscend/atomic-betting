"use client";

import { AlertTriangleIcon, LockIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const reasons = [
  {
    title: `La page n'existe pas`,
    description: `Vous avez peut-être mal orthographié l'URL, ou la page a été déplacée vers un autre endroit.`,
    icon: SearchIcon,
  },
  {
    title: `Accès non autorisé`,
    description: `Vous n'avez peut-être pas les droits nécessaires pour accéder à cette ressource.`,
    icon: LockIcon,
  },
];

const funnyMessages = [
  `Oups ! On dirait que vous avez parié sur la mauvaise page.`,
  `404 : La page a disparu comme vos jetons après un pari risqué.`,
  `Cette page est aussi introuvable qu'un pari sûr à 100%.`,
  `Vous venez de trouver notre page secrète ! Enfin, pas si secrète que ça...`,
];

export default function NotFoundPage() {
  const [funnyMessage] = useState(() => funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-center text-6xl font-extrabold tracking-tight text-red-900">
          <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">404</span>
        </h1>

        <Card className="mb-8 overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 text-white">
            <CardTitle className="flex items-center text-2xl">
              <AlertTriangleIcon className="mr-2 size-6" />
              {`Page non trouvée`}
            </CardTitle>
            <CardDescription className="text-red-100">{funnyMessage}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4 text-gray-600">{`Voici quelques raisons pour lesquelles vous pourriez vous retrouver ici :`}</p>
            <div className="space-y-4">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="rounded-full bg-red-100 p-2">
                    <reason.icon className="size-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-red-700">{reason.title}</p>
                    <p className="text-sm text-gray-600">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/" passHref>
            <Button className="rounded-full bg-gradient-to-r from-red-500 to-red-700 px-6 py-2 text-white transition duration-300 hover:shadow-lg">
              {`Retourner à l'accueil`}
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-center text-gray-600">
          {`Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à `}
          <a href="/contact" className="font-medium text-red-600 hover:underline">
            {`nous contacter`}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
