"use client";

import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type User = {
  id: string;
  name: string;
  email: string;
  coins: number;
  status: "pending" | "active";
};

export function UserManagement({ teamId }: { teamId: string }) {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Alice Dubois", email: "alice@example.com", coins: 300, status: "active" },
    { id: "2", name: "Bob Martin", email: "bob@example.com", coins: 250, status: "active" },
    { id: "3", name: "Charlie Dupont", email: "charlie@example.com", coins: 0, status: "pending" },
  ]);

  const [newCoAdminEmail, setNewCoAdminEmail] = useState("");

  const handleApproveUser = (userId: string) => {
    // Logique pour approuver l'utilisateur
  };

  const handleDeclineUser = (userId: string) => {
    // Logique pour refuser l'utilisateur
  };

  const handleUpdateCoins = (userId: string, newCoins: number) => {
    // Logique pour mettre à jour les jetons de l'utilisateur
  };

  const handleRemoveUser = (userId: string) => {
    // Logique pour supprimer l'utilisateur
  };

  const handleAddCoAdmin = () => {
    // Logique pour ajouter un co-administrateur
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Gestion des utilisateurs"}</CardTitle>
        <CardDescription>{"Gérez les membres de votre équipe"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Invitations en attente</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users
                  .filter((user) => user.status === "pending")
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleApproveUser(user.id)}>
                            <CheckIcon className="size-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeclineUser(user.id)}>
                            <XIcon className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Membres actifs</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Jetons</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users
                  .filter((user) => user.status === "active")
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={user.coins}
                          onChange={(e) => handleUpdateCoins(user.id, parseInt(e.target.value))}
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="destructive" onClick={() => handleRemoveUser(user.id)}>
                          Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <div className="space-y-2">
            <Label htmlFor="coAdminEmail">{"Ajouter un co-administrateur"}</Label>
            <div className="flex space-x-2">
              <Input
                id="coAdminEmail"
                type="email"
                value={newCoAdminEmail}
                onChange={(e) => setNewCoAdminEmail(e.target.value)}
                placeholder="Email du co-administrateur"
              />
              <Button onClick={handleAddCoAdmin}>{"Ajouter"}</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
