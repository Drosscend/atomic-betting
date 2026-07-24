# Atomic Betting

Une plateforme de paris amicaux entre équipes, en **monnaie fictive**. Un groupe d'amis ou de collègues peut parier entre eux sur à peu près n'importe quoi : un résultat sportif, l'issue d'un pari de bureau, une question ouverte. C'est un jeu social, pas une plateforme de jeu d'argent.

> Projet personnel, construit pour expérimenter et apprendre. Il n'est plus déployé ni activement développé.

## Fonctionnalités

- **Équipes** avec adhésions, rôles (membre, gestionnaire, administrateur) et statuts (en attente, actif, refusé), rejointes par un **lien d'invitation** avec approbation.
- **Paris à options**, ouverts et fermés à des dates données, avec des mises minimales et maximales.
- **Cotes en pari mutuel** : la cote d'une option est l'inverse de sa part dans le total des mises. À la clôture, un responsable désigne la bonne réponse et les gains sont distribués (mise multipliée par la cote finale).
- **Solde en jetons** par équipe, tenu cohérent avec un journal de transactions par des écritures atomiques.
- **Récompense quotidienne** avec bonus de série (jours consécutifs) et confettis, configurable par équipe.
- **Authentification** par OAuth (GitHub, Discord, Google), sessions en base.
- Pages publiques : accueil, fonctionnalités, FAQ, parcours de bienvenue, confidentialité et conditions.

## Stack technique

- [Next.js](https://nextjs.org/) (App Router) et [React](https://react.dev/)
- [Auth.js](https://authjs.dev/) (next-auth) avec l'adapter Prisma
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) typées avec [next-safe-action](https://next-safe-action.dev/) et [Zod](https://zod.dev/)
- [Prisma](https://www.prisma.io/) sur [PostgreSQL](https://www.postgresql.org/) (adapter [Neon](https://neon.tech/) serverless)
- [Zustand](https://zustand-demo.pmnd.rs/), [React Hook Form](https://react-hook-form.com/), [Recharts](https://recharts.org/), [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) pour les tests
- Déployé sur [Vercel](https://vercel.com/)

## Modèle de données

Les entités principales sont `Team`, `TeamMembership`, `Bet`, `QuestionBet`, `BetOption` et `Transaction`. Le solde d'un membre est stocké sur son adhésion et maintenu cohérent avec le journal des transactions (mises, gains, récompenses) grâce à des transactions Prisma atomiques.

Le schéma complet est dans [`prisma/schema.prisma`](prisma/schema.prisma).

## Démarrage local

### Prérequis

- [Bun](https://bun.sh/)
- Une base de données PostgreSQL (locale, ou une base [Neon](https://neon.tech/))

### Installation

```bash
git clone https://github.com/Drosscend/atomic-betting
cd atomic-betting
bun install
```

### Configuration

Créez un fichier `.env` à la racine :

```env
POSTGRES_PRISMA_URL="postgresql://user:password@host:5432/atomic_betting"
POSTGRES_URL_NON_POOLING="postgresql://user:password@host:5432/atomic_betting"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

AUTH_SECRET="..."
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
AUTH_DISCORD_ID="..."
AUTH_DISCORD_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
```

Synchronisez le schéma avec la base :

```bash
bunx prisma db push
```

### Lancement

```bash
bun dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande         | Description                          |
| ---------------- | ------------------------------------ |
| `bun dev`        | Serveur de développement             |
| `bun run build`  | Build de production                  |
| `bun start`      | Serveur de production                |
| `bun test`       | Tests (Vitest)                       |
| `bun run lint`   | Analyse ESLint                       |
| `bun run format` | Vérification du formatage (Prettier) |
