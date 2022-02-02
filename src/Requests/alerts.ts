import { Alerte } from './Intefaces/interfaces-requests';
// ============================================>
// GESTIONS DES MESSAGES D'ALERTE EN GLOBAL
// ============================================>

const alerte: Alerte = { message: null, display: false, success: true };
export const displayAlerte = () => {
   return alerte;
};

export const alerteValidationCreateAccount: any = () => {
   alerte.message =
      "Ton compte à bien été créé. Un email vient de t'être envoyé. Bienvenue dans l'équipe !";
   alerte.display = true;
   alerte.success = true;

   return alerte;
};

export const alerteValidationConnection: any = () => {
   alerte.message = 'Tu es maintenant connecté ! Bienvenue ! ';
   alerte.display = true;
   alerte.success = true;

   return alerte;
};

export const alerteErrorFormEmail: any = (message: string) => {
   alerte.message = message;
   alerte.display = true;
   alerte.success = false;

   return alerte;
};

export const alerteErrorFormUsername: any = () => {
   alerte.message = "Ce nom d'utilisateur est déja utilisé";
   alerte.display = true;
   alerte.success = false;

   return alerte;
};

export const resetAlerte: any = () => {
   alerte.display = false;
   return alerte;
};

// ============================================>
// ----------------------------------------------
// ============================================>
