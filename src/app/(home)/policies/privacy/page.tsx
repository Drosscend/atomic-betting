import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atomic Betting - Politique de confidentialité",
  description: "Politique de confidentialité de Atomic Betting",
};
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{"Politique de confidentialité d'Atomic Betting"}</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{"Dernière mise à jour : 15 septembre 2024"}</p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {
          "Chez Atomic Betting, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations."
        }
      </p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`1. Collecte d'informations`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{`Nous collectons les informations suivantes :`}</p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{`Nom et adresse e-mail lors de l'inscription`}</li>
        <li>{`Données d'utilisation de l'application`}</li>
        <li>{`Informations sur les paris virtuels effectués`}</li>
      </ul>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`2. Utilisation des informations`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{`Nous utilisons vos informations pour :`}</p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{`Gérer votre compte utilisateur`}</li>
        <li>{`Améliorer l'expérience utilisateur de l'application`}</li>
        <li>{`Envoyer des notifications relatives à votre activité sur Atomic Betting`}</li>
      </ul>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`3. Protection des données`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Nous mettons en place des mesures de sécurité pour protéger vos informations contre tout accès non autorisé ou toute divulgation.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`4. Partage d'informations`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Nous ne vendons ni ne partageons vos informations personnelles avec des tiers, sauf dans les cas suivants :`}
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{`Avec votre consentement explicite`}</li>
        <li>{`Pour se conformer à une obligation légale`}</li>
      </ul>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`5. Cookies et technologies similaires`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Nous utilisons des cookies pour améliorer votre expérience sur l'application et analyser son utilisation.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{`6. Vos droits`}</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Vous avez le droit d'accéder à vos données personnelles, de les rectifier ou de demander leur suppression.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`7. Modifications de la politique`}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Nous nous réservons le droit de modifier cette politique de confidentialité. Les utilisateurs seront informés des changements importants.`}
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{`8. Contact`}</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à privacy@atomicbetting.com.`}
      </p>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {`En utilisant Atomic Betting, vous acceptez les termes de cette politique de confidentialité.`}
      </p>
    </div>
  );
}
