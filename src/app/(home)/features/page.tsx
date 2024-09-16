import type { Metadata } from "next";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description: "Découvrez les fonctionnalités uniques d'Atomic Betting",
};

const features = [
  {
    feature: "Paris virtuels",
    benefit: "Amusement sans risque financier",
    description: "Pariez sur une variété d'événements avec de la monnaie virtuelle",
  },
  {
    feature: "Tableau de bord",
    benefit: "Suivi des performances",
    description: "Visualisez vos statistiques et votre classement en temps réel",
  },
  {
    feature: "Analyse des tendances",
    benefit: "Amélioration des stratégies",
    description: "Obtenez des insights sur les paris populaires et vos performances",
  },
  {
    feature: "Notifications",
    benefit: "Engagement accru",
    description: "Restez informé des nouveaux paris et des résultats",
  },
  {
    feature: "Création d'équipes",
    benefit: "Expérience sociale",
    description: "Formez des équipes et pariez avec vos amis",
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{`Fonctionnalités d'Atomic Betting`}</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Plongez dans l'univers excitant des paris virtuels avec Atomic Betting. Voici les fonctionnalités qui font de notre plateforme une expérience unique et divertissante pour vous et vos amis.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`Créez et gérez votre équipe`}
      </h2>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{`Formez votre propre équipe de parieurs virtuels`}</li>
        <li>{`Invitez vos amis ou collègues à rejoindre l'aventure`}</li>
        <li>{`Attribuez des rôles et gérez les permissions au sein de votre groupe`}</li>
      </ul>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`Pariez sur tout et n'importe quoi`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{`Avec Atomic Betting, votre imagination est la seule limite. Pariez sur :`}</p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{`Des événements sportifs passionnants`}</li>
        <li>{`L'actualité brûlante du moment`}</li>
        <li>{`Des défis personnels entre amis`}</li>
        <li>{`Et bien plus encore !`}</li>
      </ul>

      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {`"Avec Atomic Betting, transformez chaque moment en une opportunité de pari amusante et sans risque !"`}
      </blockquote>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`Fonctionnalités principales`}
      </h2>
      <Table>
        <TableCaption>{`Découvrez les fonctionnalités clés d'Atomic Betting`}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">{`Fonctionnalité`}</TableHead>
            <TableHead>{`Bénéfice`}</TableHead>
            <TableHead>{`Description`}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.feature}>
              <TableCell className="font-medium">{feature.feature}</TableCell>
              <TableCell>{feature.benefit}</TableCell>
              <TableCell>{feature.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`Sécurité et confidentialité`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{`Votre sécurité est notre priorité :`}</p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{`Authentification sécurisée`}</li>
        <li>{`Chiffrement des données`}</li>
        <li>{`Contrôle total sur la visibilité de votre profil`}</li>
      </ul>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Atomic Betting combine le frisson des paris avec une expérience sociale unique, le tout dans un environnement sûr et sans risque financier. Rejoignez-nous dès maintenant et découvrez qui sera le meilleur parieur de votre groupe !`}
      </p>
    </div>
  );
}
