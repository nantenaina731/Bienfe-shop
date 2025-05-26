
export interface userToSend {
  email: string;
  password: string;
}
export interface ShopInfo {
  name?:string;
  logo?:string
}


export type profilePage = "Mon compte" | "Vendeur" | "Administrateurs";

export type productPage = "Vente de produit" | "Gestion de produit";
