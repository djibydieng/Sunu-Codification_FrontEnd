export class Etudiant
{
    id?: string;
    nom: string;
    prenom: string;
    sexe: string;
    numCIN: string;
    numCE: string;
    code: string;
    email:string;
    emailVerified: boolean;
    password:string;
    departementId?: string;
    niveauId?: string;
   /* constructor(data:any)
    {
        this.id = data.id
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.sexe = data.sexe;
        this.numCNI = data.numCNI;
        this.numCE = data.numCE;
        this.email = data.email;
        this.emailVerified = data.emailVerified;
        this.password = data.password;
        this.departementId =  data.departementId;
        this.niveauId = data.niveauId;
    }*/
}