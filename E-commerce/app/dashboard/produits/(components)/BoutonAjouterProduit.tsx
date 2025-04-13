

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


export function BoutonAjouterProduit() {
  return (
    <form action="">
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Ajouter Produit </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Ajouter Produit</DialogTitle>
          <DialogDescription>
          Ajouter un produit que les clients pourront acheter en respectant les modalités du formulaires
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">
              Nom*
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prix" className="text-right">
              Prix*
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description*
            </Label>
            <Input
              id="description"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantitestock" className="text-right">
              Quantité stock*
            </Label>
            <Input
              id="quantitestock"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
         
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prix" className="text-right">
              Catégorie*
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
              defaultValue="@peduarte"
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
