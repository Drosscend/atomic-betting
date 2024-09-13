import { XCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorDisplayProps {
  title: string;
  message: string;
  buttonText: string;
  buttonHref: string;
}

export function ErrorDisplay({ title, message, buttonText, buttonHref }: ErrorDisplayProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <XCircleIcon className="text-destructive mx-auto size-12" />
        <CardTitle className="mt-4 text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center">{message}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href={buttonHref} passHref>
          <Button variant="outline">{buttonText}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
