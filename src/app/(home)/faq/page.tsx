import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Foire Aux Questions - Atomic Betting</h1>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="what-is-atomic-betting">
          <AccordionTrigger>{`Qu'est-ce qu'Atomic Betting ?`}</AccordionTrigger>
          <AccordionContent>
            {`Atomic Betting est une plateforme de paris virtuels entre amis ou collègues. Elle permet de créer des paris personnalisés sur divers événements, d'utiliser une monnaie virtuelle (Atomic Credits) sans risque financier réel, et de participer à des équipes privées pour des paris en groupe.`}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-to-start">
          <AccordionTrigger>{`Comment commencer sur Atomic Betting ?`}</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal pl-5">
              <li>{`Inscrivez-vous sur la plateforme`}</li>
              <li>{`Créez ou rejoignez une équipe`}</li>
              <li>{`Recevez vos Atomic Credits initiaux`}</li>
              <li>{`Commencez à participer ou à créer des paris !`}</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="what-are-atomic-credits">
          <AccordionTrigger>{`Que sont les Atomic Credits ?`}</AccordionTrigger>
          <AccordionContent>
            {`Les Atomic Credits sont la monnaie virtuelle utilisée sur Atomic Betting. Ils n'ont aucune valeur réelle et ne peuvent pas être échangés contre de l'argent réel. Ils servent uniquement à placer des paris et à suivre vos performances sur la plateforme.`}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="odds-calculation">
          <AccordionTrigger>{`Comment sont calculées les cotes sur Atomic Betting ?`}</AccordionTrigger>
          <AccordionContent>
            <p>{`Les cotes sur Atomic Betting sont calculées dynamiquement en fonction des paris placés par les utilisateurs. Voici une explication simplifiée du processus :`}</p>
            <ol className="mt-2 list-decimal pl-5">
              <li>{`Toutes les mises (en Atomic Credits) pour chaque option sont additionnées.`}</li>
              <li>{`La probabilité de chaque option est calculée en divisant le total des mises sur cette option par le total de toutes les mises.`}</li>
              <li>{`La cote est l'inverse de cette probabilité.`}</li>
              <li>{`Si aucun pari n'a été placé, des cotes égales sont attribuées à toutes les options, basées sur le nombre d'options disponibles.`}</li>
            </ol>
            <p className="mt-2">{`Ce système assure que les cotes reflètent l'opinion collective des parieurs et s'ajustent en temps réel à mesure que de nouveaux paris sont placés.`}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="payout-calculation">
          <AccordionTrigger>{`Comment sont calculés les gains ?`}</AccordionTrigger>
          <AccordionContent>
            <p>{`Les gains sont calculés au moment où le pari est clôturé et que le résultat est annoncé. Voici comment cela fonctionne :`}</p>
            <ol className="mt-2 list-decimal pl-5">
              <li>{`Lorsque le résultat du pari est annoncé, les cotes finales sont calculées en tenant compte de toutes les mises placées.`}</li>
              <li>{`Pour chaque pari gagnant, les gains sont calculés en multipliant la mise par la cote finale de l'option gagnante.`}</li>
              <li>{`Les Atomic Credits gagnés sont ensuite distribués aux parieurs ayant choisi l'option gagnante.`}</li>
            </ol>
            <p className="mt-2">{`Il est important de noter que les gains sont basés sur les cotes finales au moment de la clôture du pari, et non sur les cotes au moment où vous avez placé votre mise. Cela signifie que vos gains potentiels peuvent fluctuer jusqu'à la fin du pari.`}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="create-bet">
          <AccordionTrigger>{`Comment créer un pari ?`}</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal pl-5">
              <li>{`Accédez à votre tableau de bord d'administration de votre équipe`}</li>
              <li>{`Cliquez sur "Créer un nouveau pari"`}</li>
              <li>{`Définissez le sujet du pari, les options de réponse, la durée du pari, et les limites de mise`}</li>
              <li>{`Validez la création du pari`}</li>
            </ol>
            <p className="mt-2">{`Assurez-vous que le sujet du pari est clair et que les options de réponse sont mutuellement exclusives pour éviter toute confusion.`}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="private-teams">
          <AccordionTrigger>{`Comment fonctionnent les équipes privées ?`}</AccordionTrigger>
          <AccordionContent>
            <p>{`Les équipes privées sur Atomic Betting permettent de créer des groupes fermés pour parier entre amis ou collègues. Voici comment elles fonctionnent :`}</p>
            <ul className="mt-2 list-disc pl-5">
              <li>{`Chaque équipe a son propre espace de paris et classement`}</li>
              <li>{`Les membres peuvent créer et participer à des paris spécifiques à leur équipe`}</li>
              <li>{`L'accès à l'équipe se fait sur invitation`}</li>
              <li>{`Les administrateurs de l'équipe peuvent gérer les membres et les paramètres`}</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fairness">
          <AccordionTrigger>{`Comment Atomic Betting assure-t-il l'équité des paris ?`}</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5">
              <li>{`Calcul transparent des cotes basé sur les mises des utilisateurs`}</li>
              <li>{`Limites de mise pour éviter la domination par un seul utilisateur`}</li>
              <li>{`Vérification des résultats par les administrateurs de l'équipe`}</li>
              <li>{`Utilisation d'une monnaie virtuelle pour éliminer les risques financiers réels`}</li>
              <li>{`Historique complet des paris et des transactions accessible aux utilisateurs`}</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="data-privacy">
          <AccordionTrigger>{`Comment mes données sont-elles protégées ?`}</AccordionTrigger>
          <AccordionContent>
            <p>{`Atomic Betting prend très au sérieux la protection de vos données :`}</p>
            <ul className="mt-2 list-disc pl-5">
              <li>{`Nous ne partageons jamais vos informations personnelles avec des tiers`}</li>
              <li>{`Vous pouvez demander la suppression de vos données à tout moment`}</li>
            </ul>
            <p className="mt-2">{`Pour plus de détails, consultez notre politique de confidentialité.`}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contact-support">
          <AccordionTrigger>{`Comment contacter le support ?`}</AccordionTrigger>
          <AccordionContent>
            <p>{`Si vous avez des questions ou rencontrez des problèmes, vous pouvez nous contacter de plusieurs façons :`}</p>
            <ul className="mt-2 list-disc pl-5">
              <li>{`Email : kevin.veronesipro@gmail.com`}</li>
            </ul>
            <p className="mt-2">{`Notre équipe s'efforce de répondre à toutes les demandes dans un délai de 24 heures ouvrables.`}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
