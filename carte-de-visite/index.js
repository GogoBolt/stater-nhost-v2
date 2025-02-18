const PDFDocument = require('pdfkit');
const fs = require('fs');

// Création du document PDF
const doc = new PDFDocument({ size: 'A4', margin: 40 });

// Définir le chemin de sortie du fichier
doc.pipe(fs.createWriteStream('carte-de-visite.pdf'));

// Couleurs
const primaryColor = '#007BFF';
const secondaryColor = '#343A40';
const textColor = '#444444';
const separatorColor = '#D3D3D3'; // Gris argenté

// Logo et Nom de la Société
doc.image('../public/logo.png', 40, 20, { width: 80, align: 'center', radius: 20 }); // Image avec bords arrondis
doc.moveDown(1);
doc.fontSize(20).fillColor(primaryColor).text('Localhost TGSoft', 170, 30);
doc.moveDown(1); 

// Titre principal
doc.fontSize(24).fillColor(primaryColor).text('Carte de Visite Numérique', {
  align: 'center',
  underline: true
});
doc.moveDown(1);

// Informations personnelles
doc.fontSize(18).fillColor(secondaryColor).text('Thierry Gogo', {
  align: 'center'
});
doc.fontSize(14).text('Diplômé de l\'ISFMI', {
  align: 'center'
});
doc.text('Institut Supérieur de Formation aux Métiers de l\'Informatique', {
  align: 'center'
});
doc.text('Abidjan, Côte d\'Ivoire', {
  align: 'center'
}); 
 
doc.text('+225 07-58-96-61-56 / sieur.thierry.gogo@gmail.com', {
  align: 'center'
}); 

// Séparation (Ligne gris argenté)
doc.moveDown(1);
doc.strokeColor(separatorColor).lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown(1);

// Section Passion et Spécialisation
doc.image('../public/icon-passion.png', 50, doc.y, { width: 20, align: 'left', radius: 10 }); // Image avec bords arrondis
doc.moveDown(2);
doc.fontSize(16).fillColor(primaryColor).text('Passion et Spécialisation', 80, doc.y - 20, { align: 'left', underline: true });
doc.moveDown(0.5);
doc.fontSize(14).fillColor(textColor).text('- Passionné par la Transformation Digitale', {
  align: 'justify'
});
doc.text('- Spécialiste des Solutions Numériques', {
  align: 'justify'
}); 

// Séparation (Ligne gris argenté)
doc.moveDown(1);
doc.strokeColor(separatorColor).lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown(1);

// Section Profil
doc.image('../public/icon-profil.png', 50, doc.y, { width: 20, align: 'left', radius: 10 }); // Image avec bords arrondis
doc.moveDown(1);
doc.fontSize(16).fillColor(primaryColor).text('Profil', 80, doc.y - 20, { align: 'left', underline: true });
doc.moveDown(0.5);
doc.fontSize(14).fillColor(textColor).text('- Autodidacte et constamment en quête de nouveaux défis.', {
  align: 'justify'
});
doc.text('- Attiré par le challenge et la résolution des problèmes des entreprises.', {
  align: 'justify'
});
doc.text('- Entrepreneur visionnaire :', {
  align: 'justify'
});
doc.text('  Fondateur de l’entreprise LocalHost TGSoft, orientée vers l\'avenir et les solutions innovantes.', {
  align: 'justify'
});
 

// Séparation (Ligne gris argenté)
doc.moveDown(1);
doc.strokeColor(separatorColor).lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown(1);

// Section Coordonnées
doc.image('../public/icon-contact.png', 50, doc.y, { width: 20, align: 'left', radius: 10 }); // Image avec bords arrondis
doc.moveDown(1);
doc.fontSize(16).fillColor(primaryColor).text('Coordonnées', 80, doc.y - 20, { align: 'left', underline: true });
doc.moveDown(0.5);
doc.fontSize(14).fillColor(textColor).text('- Téléphone : +225 01-41-57-36-41', {
  align: 'justify'
});
doc.text('- Email : 2024dibo@gmail.com', {
  align: 'justify'
});
doc.text('- Twitter : @tgsoft', {
  align: 'justify'
});
doc.text('- GitHub : TGSOFT', {
  align: 'justify'
});

// Séparation (Ligne gris argenté)
doc.moveDown(1);
doc.strokeColor(separatorColor).lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown(1);

// Section Solutions MVP en attente de déploiement
doc.image('../public/icon-work.png', 50, doc.y, { width: 20, align: 'left', radius: 10 }); // Image avec bords arrondis
doc.moveDown(1);
doc.fontSize(16).fillColor(primaryColor).text('Solutions MVP en Attente de Déploiement', {
  align: 'left',
  underline: true
});
doc.moveDown(0.5);
doc.fontSize(14).fillColor(textColor).text('- Gestion de cantines scolaires avec QR-Code sur Badge ou carte scolaire', {
  align: 'justify'
});
doc.text('- Gestion des décomptes BTP-Travaux Publics', {
  align: 'justify'
});
doc.text('- Gestion des Agro-vivriers : mise en relation acheteurs - producteurs - transporteurs, Promo produit, Galerie, fidélisation, notifications push', {
  align: 'justify'
});
doc.text('- Gestion Restaurant-Bar-Lounge : Promo produit, Galerie, fidélisation, notifications push', {
  align: 'justify'
});
doc.text('- Gestion des Salons de coiffure et de couture : Promo produit, Galerie, fidélisation, notifications push', {
  align: 'justify'
});
doc.moveDown(1);

// Image de profil en bas à droite
doc.image('../public/profile.png', 420, 500, { width: 80, height: 80, align: 'right', radius: 20 }); // Image avec bords arrondis

// Terminer le PDF
doc.end();
