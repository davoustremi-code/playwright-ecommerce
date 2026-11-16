
*************************
SMOKE TEST
*************************
Client existant : Accès au site ==> auth ==> connexion ==> ajout produit ==> panier ==> paiement ==> commande validée
Nouveau client : Accès au site ==> ajout produit ==> panier ==>  paiement ==> redirection sur checkout pour se connecter ==> renvoie sur auth ==> inscription ==> creer un compte ==> paiement ==>  commande validée









Ne fonctionne pas

header : loupe recherche, rien ne se passe.
Depuis la page auth, pas de bouton, icone retour possible sur page acueil, si icone et titre techHub doivent renvoyer, c'est pas fonctionnel
mail contact footer cliquable mais ne fait rien
libellé "Blog" ne répond a rien
Carrières qui amèhne sur accueil : https://shop.missionplaywright.fr/
Presse qui amène sur https://shop.missionplaywright.fr/

**************d***********************************************************************
*************************
cas de test accès au site
*************************

Accèder au site du site : https://shop.missionplaywright.fr/
pour valider que c'est OK, 
verifeir que l'URl contient  : https://shop.missionplaywright.fr/ @smoke
En complément, on peut aussi se baser sur la page centrale et le text : 

La technologie qui simplifie votre quotidien
Découvrez notre sélection de produits tech innovants pour la maison, le bureau et le gaming. Qualité premium, prix compétitifs.

******************
HAEDER (spec.ts + POM) présent sur toutes les pages donc  inclure une fois le test sur page home par exemple
******************
Affichage gauche :
Icone + Nom du site cliquable et renvoie sur home : https://shop.missionplaywright.fr/

Affichage central :
@smoke présence du lebellé Accueil (libellé cliquable) renvoie sur  : https://shop.missionplaywright.fr/ 
@smoke présence du lebellé Produits (libellé cliquable) renvoie sur : https://shop.missionplaywright.fr/products
@smoke présence du lebellé A propos (libellé cliquable) renvoie sur : https://shop.missionplaywright.fr/about
@smoke présence du lebellé Contact (libellé cliquable) renvoie sur https://shop.missionplaywright.fr/contact

Affichage droit :
icone loupe de recherche : ne répond pas (volontaire ?)
@smoke icone cadis renvoie sur https://shop.missionplaywright.fr/cart
@smoke icone profil renvoie sur https://shop.missionplaywright.fr/auth (si non logué, si déjà logué, voir comportement)

******************
FOOTER (spec.ts + POM) présent sur toutes les pages donc  inclure une fois le test sur page home par exemple
******************
Affichage gauche

logo + titre site
texten dessous : La technologie qui simplifie votre quotidien. Découvrez les meilleurs produits tech sélectionnés par nos experts.
icone reseaux sociaux FB, Twitter, Insta, Linkedin
Maild e contact avec icone enveloppe devant : contact@techhub.fr 
numéro de téléphone avcec  icone telephone devant 01 23 45 67 89 cliquable et propose application d'appel
Lieu de la société précédent dicone lieu : Paris, France

Affichage central
Titre: Produits avec en dessous des catégories cliquables : 
Accessoires qui amène sur page produit et catégorie accessories: https://shop.missionplaywright.fr/products?category=accessories
Maison connectée qui amène sur page produit et catégorie smart-home : https://shop.missionplaywright.fr/products?category=smart-home
Gaming qui amène sur page produit et catégorie gaming : https://shop.missionplaywright.fr/products?category=gaming
Bureau qui amène sur page produit et catégorie office : https://shop.missionplaywright.fr/products?category=office

Titre: Entreprise avec en dessous des catégories cliquables :
A propos qui amène sur https://shop.missionplaywright.fr/about
Carrières qui amèhne sur accueil : https://shop.missionplaywright.fr/
Presse qui amène sur https://shop.missionplaywright.fr/
Blog qui ne reagit pas au clic.