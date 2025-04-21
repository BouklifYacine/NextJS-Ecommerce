

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil } from "lucide-react"
import { BoutonModifierProps } from "../(interface-types)/interfacetypes"


export function BoutonModifier({produit} : BoutonModifierProps) {
  return (
    <form action="">
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Modifier produit <Pencil /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier produit</DialogTitle>
          <DialogDescription>
          Modifier le produit avec les données de votre choix 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">
              Nom*
            </Label>
            <Input
              id="name"
              defaultValue={produit.nom}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prix" className="text-right">
              Prix *
            </Label>
            <Input
              id="username"
              defaultValue={produit.prix}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description*
            </Label>
            <Input
              id="description"
              defaultValue={produit.description}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantitestock" className="text-right">
              Quantité stock*
            </Label>
            <Input
              id="quantitestock"
              defaultValue={produit.quantiteStock}
              className="col-span-3"
            />
          </div>
         
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prix" className="text-right">
              Catégorie *
            </Label>
            <Select >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Liste Catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Catégories</SelectLabel>
                <SelectItem value="ELECTRONIQUE">Electronique </SelectItem>
                <SelectItem value="INFORMATIQUE">Informatique</SelectItem>
                <SelectItem value="GAMING">Gaming</SelectItem>
                <SelectItem value="MOBILIER">Mobilier</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="promotion" className="text-right">
            Prix Promotion
            </Label>
            <Input
              id="promotion"
              defaultValue={produit.prixPromo ? produit.prixPromo : ""}
              className="col-span-3"
            />
          </div>
        
        </div>
        <DialogFooter>
          <Button >Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </form>
  )
}
