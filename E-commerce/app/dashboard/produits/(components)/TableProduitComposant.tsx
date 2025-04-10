import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'

import React from 'react'

const TableProduitComposant = () => {
  return (
    <div className="rounded-md border p-6 mt-6">
      <h1 className='text-xl font-bold mb-4'>Liste des produits </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="font-bold text-black">Avatar</TableHead>
            <TableHead className="font-bold text-black">Role</TableHead>
            <TableHead className="font-bold text-black">Pseudo</TableHead>
            <TableHead className="font-bold text-black">Email</TableHead>
            <TableHead className="font-bold text-black">Créé le</TableHead>
            <TableHead className="font-bold text-black">Abonnement</TableHead>
            <TableHead className="font-bold text-black">Periode</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-black">
                J
              </div>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Admin
              </span>
            </TableCell>
            <TableCell>Jean Dupont</TableCell>
            <TableCell>jean@example.com</TableCell>
            <TableCell>01/04/2024</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Premium
                </span>
                <select className="ml-2 text-xs border rounded p-1">
                  <option>Admin</option>
                  <option>Utilisateur</option>
                </select>
              </div>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                année
              </span>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-black">
                M
              </div>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Utilisateur
              </span>
            </TableCell>
            <TableCell>Marie Martin</TableCell>
            <TableCell>marie@example.com</TableCell>
            <TableCell>15/03/2024</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Premium
                </span>
                <select className="ml-2 text-xs border rounded p-1">
                  <option>Admin</option>
                  <option selected>Utilisateur</option>
                </select>
              </div>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                mois
              </span>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-black">
                P
              </div>
            </TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Utilisateur
              </span>
            </TableCell>
            <TableCell>Pierre Durand</TableCell>
            <TableCell>pierre@example.com</TableCell>
            <TableCell>20/02/2024</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Free
                </span>
                <select className="ml-2 text-xs border rounded p-1">
                  <option>Admin</option>
                  <option selected>Utilisateur</option>
                </select>
              </div>
            </TableCell>
            <TableCell>Freemium</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default TableProduitComposant