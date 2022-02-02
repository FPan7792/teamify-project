import { setUserHasTeamsExisting } from '../user';
export interface Alerte {
   message: string | null;
   display: boolean;
   success: boolean;
}

export interface Player {
   name: string;
   value: string;
}

export interface UserBox {
   number_of_teams: number;
   owner: string;
   teams: Team[];
   user_id: string;
   _id: string;
   __v: number;
}

export interface Team {
   equipe: Player[];
   valeur: number;
}

export interface User {
   token: string | null;
   userName: string | null;
   connected: boolean;
   hasTeamsExisting: boolean;
}
