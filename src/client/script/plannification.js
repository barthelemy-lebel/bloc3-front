import jsPDF from './jspdf';

function genererPDF(nom, prenom) {
  // Créer une instance de jsPDF
  const doc = new jsPDF();
  
  // Ajouter du texte avec le nom et le prénom du client
  doc.text(`Nom: ${nom}`, 10, 10);
  doc.text(`Prénom: ${prenom}`, 10, 20);

  // Ajouter du style au texte
  doc.setFontSize(16);
  doc.setTextColor(255, 0, 0); // Rouge
  doc.setFontStyle('bold');

  // Sauvegarder le PDF avec un nom de fichier
  doc.save('fiche_client.pdf');
}

// Appeler la fonction pour générer le PDF avec les informations du client
genererPDF('Doe', 'John');