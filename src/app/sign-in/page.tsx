import type { SignInPageErrorParam } from "@auth/core/types";
import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "@/lib/auth";

export default function Page({ searchParams }: { searchParams: { error: SignInPageErrorParam | undefined } }) {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">{`Connexion`}</CardTitle>
          <CardDescription className="text-center">{`Connectez-vous avec GitHub ou Discord pour accéder à votre compte`}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {searchParams.error === "OAuthAccountNotLinked" && (
            <Alert variant="destructive">
              <AlertDescription>{`L'authentification a échoué. Ce compte est déjà lié à un autre utilisateur.`}</AlertDescription>
            </Alert>
          )}
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <Button type="submit" className="w-full">
              <SiGithub className="mr-2 size-4" />
              {`Se connecter avec GitHub`}
            </Button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("discord", { redirectTo: "/dashboard" });
            }}
          >
            <Button type="submit" className="w-full">
              <SiDiscord className="mr-2 size-4" />
              {`Se connecter avec Discord`}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-center text-sm">
            {`En vous connectant, vous acceptez nos `}
            <a href="#" className="hover:text-primary underline">
              {`conditions d'utilisation`}
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
