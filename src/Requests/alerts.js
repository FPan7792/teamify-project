// ============================================>
// GESTIONS DES MESSAGES D'ALERTE EN GLOBAL
// ============================================>

let alerte = { message: null, display: false, success: true };
export const displayAlerte = () => {
  return alerte;
};

export const alerteValidationCreateAccount = () => {
  alerte.message = "Ton compte à bien été créé. Bienvenue dans l'équipe !";
  alerte.display = true;
  alerte.success = true;

  return alerte;
};

export const alerteValidationConnection = () => {
  alerte.message = "Tu es maintenant connecté ! Bienvenue ! ";
  alerte.display = true;
  alerte.success = true;

  return alerte;
};

export const alerteErrorFormEmail = (message) => {
  alerte.message = message;
  alerte.display = true;
  alerte.success = false;

  return alerte;
};

export const alerteErrorFormUsername = () => {
  alerte.message = "Ce nom d'utilisateur est déja utilisé";
  alerte.display = true;
  alerte.success = false;

  return alerte;
};

export const resetAlerte = () => {
  alerte.display = false;
  return alerte;
};

// ============================================>
// ----------------------------------------------
// ============================================>
