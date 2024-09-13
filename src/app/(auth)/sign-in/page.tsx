import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">{`Connexion`}</CardTitle>
          <CardDescription className="text-center">{`Connectez-vous avec GitHub pour accéder à votre compte`}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
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
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-sm">
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
