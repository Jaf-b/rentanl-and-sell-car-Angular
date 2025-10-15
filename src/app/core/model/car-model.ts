export interface carModel {
  _id?: string;
  ShopID: string;
  isForSell: boolean;
  images: string[];
  marque: string;
  modele: string;
  anneeFabrication: string;
  fuel: "essence" | "diesel";
  numeroChassis: string;
  transmission: "Manuel" | "Automatique";
  volant: "gauche" | "droite";
  km: string;
  porte: string;
  place: string;
  couleur: string;
  price: string;
}
