import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { BoutonModifierProps } from "../(interface-types)/interfacetypes";

export function BoutonModifier({produit} : BoutonModifierProps) {
  return (
    <>
      <Link href={`/dashboard/produits/${produit.id}`}>
        <Button variant="outline">
          Modifier le produit<Pencil />
        </Button>{" "}
      </Link>
    </>
  );
}
