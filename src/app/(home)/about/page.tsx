import type { Metadata } from "next";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Atomic Betting - À propos",
  description: "Découvrez l'histoire et la mission d'Atomic Betting",
};

const companyValues = [
  {
    value: "Responsabilité",
    description: "Nous promouvons une approche responsable des paris, sans utilisation d'argent réel.",
  },
  {
    value: "Innovation",
    description: "Nous cherchons constamment à améliorer notre plateforme avec de nouvelles fonctionnalités.",
  },
  {
    value: "Communauté",
    description: "Nous valorisons les interactions sociales et l'esprit d'équipe.",
  },
  {
    value: "Transparence",
    description: "Nous sommes ouverts sur notre fonctionnement et nos pratiques.",
  },
  {
    value: "Sécurité",
    description: "La protection des données de nos utilisateurs est notre priorité.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{`À propos d'Atomic Betting`}</h1>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{`Notre histoire`}</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Atomic Betting est né d'une idée simple et spontanée lors de nos études. Pendant ces longues heures de cours parfois moins passionnants, nous avons eu l'idée de créer quelque chose pour nous divertir et rendre ces moments plus intéressants. C'est ainsi qu'est née l'idée d'une plateforme de paris virtuels entre amis.`}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Au fil du développement de l'application, nous nous sommes rendus compte que ce concept avait le potentiel d'être apprécié par un public plus large. Pourquoi garder pour nous ce qui pourrait divertir et rassembler tant d'autres personnes ? C'est avec cet esprit de partage et d'amusement que nous avons décidé de lancer Atomic Betting pour tous.`}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Aujourd'hui, notre petite idée née sur les bancs de l'école s'est transformée en une startup dynamique, dédiée à offrir une expérience de paris virtuels amusante et sans risque à tous ceux qui cherchent à pimenter leur quotidien ou à renforcer leurs liens sociaux.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{`Notre mission`}</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Chez Atomic Betting, nous croyons que les paris peuvent être une activité sociale enrichissante lorsqu'ils sont pratiqués de manière responsable et sans risque financier réel. Notre mission est de fournir une plateforme sûre et engageante où les utilisateurs peuvent :`}
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{`Développer leurs compétences en matière de prédictions`}</li>
        <li>{`Renforcer les liens sociaux au sein de groupes d'amis ou de collègues`}</li>
        <li>{`S'amuser tout en apprenant sur divers sujets`}</li>
      </ul>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{`Nos valeurs`}</h2>
      <Table>
        <TableCaption>{`Les valeurs fondamentales d'Atomic Betting`}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">{`Valeur`}</TableHead>
            <TableHead>{`Description`}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companyValues.map((item) => (
            <TableRow key={item.value}>
              <TableCell className="font-medium">{item.value}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{`Contactez-nous`}</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Nous sommes toujours ravis d'entendre nos utilisateurs. Pour toute question, suggestion ou demande de partenariat, n'hésitez pas à nous contacter :`}
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{`Email : kevin.veronesipro@gmail.com`}</li>
      </ul>

      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {`"Rejoignez l'aventure Atomic Betting dès aujourd'hui et découvrez une nouvelle façon de parier, de prédire et de vous amuser en toute sécurité !"`}
      </blockquote>
    </div>
  );
}
