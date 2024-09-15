import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atomic Betting - Conditions d'utilisation",
  description: "Conditions d'utilisation de Atomic Betting",
};
export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{"Conditions d'utilisation d'Atomic Betting"}</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{"Dernière mise à jour : 15 septembre 2024"}</p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`1. Acceptation des conditions`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`En utilisant l'application Atomic Betting, vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`2. Description du service`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Atomic Betting est une plateforme de paris virtuels entre amis ou collègues, utilisant une monnaie virtuelle sans valeur réelle.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`3. Inscription et compte utilisateur`}
      </h2>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{`Vous devez avoir au moins 18 ans pour utiliser Atomic Betting.`}</li>
        <li>{`Vous êtes responsable de maintenir la confidentialité de votre compte.`}</li>
        <li>{`Vous acceptez de fournir des informations exactes et à jour lors de l'inscription.`}</li>
      </ul>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`4. Utilisation responsable`}
      </h2>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{`L'utilisation d'Atomic Betting à des fins de paris réels ou de jeux d'argent est strictement interdite.`}</li>
        <li>{`Vous vous engagez à ne pas utiliser l'application pour des activités illégales ou frauduleuses.`}</li>
      </ul>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`5. Propriété intellectuelle`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Tout le contenu présent sur Atomic Betting est la propriété exclusive de l'entreprise ou de ses partenaires.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`6. Limitation de responsabilité`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Atomic Betting n'est pas responsable des pertes ou dommages résultant de l'utilisation de l'application.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`7. Modifications des conditions`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des changements importants.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{`8. Résiliation`}</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Nous nous réservons le droit de suspendre ou de résilier votre compte en cas de violation de ces conditions.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{`9. Loi applicable`}</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{`Ces conditions sont régies par les lois en vigueur en France.`}</p>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`En utilisant Atomic Betting, vous reconnaissez avoir lu, compris et accepté ces conditions d'utilisation.`}
      </p>
    </div>
  );
}
