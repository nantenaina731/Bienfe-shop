export interface LavageTypeListe {
  id: number;
  todoTotalTime: string;
  price: number;
  name: string;
}

export interface userToSend {
  email: string;
  password: string;
}

export interface LavageInfo {
  clientName: string;
  clientNumber: string;
  carMatricul: string;
  carName?: string;
  beginTime?: string;
  endTime?: string;
  images?: string;
  totalAmout?: number;
  carTypeId?: number;
  comment?: any;
  todoDate?: any;
  selectedCarType?: any; // not in DB but for frontend
  modePaiement?:string;
}

export type profilePage = "Mon compte" | "Employés" | "Administrateurs";

export type productPage = "Vente de produit" | "Gestion de produit";
