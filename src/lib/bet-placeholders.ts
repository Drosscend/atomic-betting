const questionPlaceholders = [
  // Courses et compétitions
  `Qui gagnera la prochaine course de bureaux à roulettes dans le couloir ?`,
  `Combien de fois le stagiaire trébuchera-t-il pendant le marathon de la productivité ?`,
  `Quel département remportera le trophée du meilleur déguisement à la fête de l'entreprise ?`,

  // Travail et bureau
  `Combien de fois le photocopieur tombera-t-il en panne cette semaine ?`,
  `Qui sera le prochain à déclencher l'alarme incendie en faisant brûler son café ?`,
  `Quel sera le prochain gadget inutile que le service marketing va nous imposer ?`,
  `Combien de temps tiendra la résolution "pas de gâteaux à la pause" de l'équipe ?`,

  // Amis et collègues
  `Qui sera le premier à craquer et à utiliser le "je suis malade" pour un jour de télétravail ?`,
  `Quel collègue sera le prochain à oublier son badge et à rester coincé à la porte ?`,
  `Qui organisera la prochaine soirée karaoké du bureau ?`,

  // Événements d'entreprise
  `Combien de temps durera le discours du PDG à la prochaine réunion générale ?`,
  `Quel sera le thème improbable de la prochaine journée "team building" ?`,
  `Qui remportera le titre de "Roi/Reine du PowerPoint" lors de la prochaine présentation ?`,

  // Vie de bureau
  `Quelle excuse créative sera utilisée pour justifier un retard cette semaine ?`,
  `Combien de plantes de bureau survivront jusqu'à la fin du mois ?`,
  `Qui sera le prochain à apporter un animal de compagnie "discret" au bureau ?`,

  // Technologie et outils de travail
  `Combien de fois entendrons-nous "Vous êtes en muet !" lors de la prochaine visioconférence ?`,
  `Quel bug improbable découvrira-t-on dans le nouveau logiciel de l'entreprise ?`,
  `Qui sera le premier à maîtriser la nouvelle machine à café high-tech ?`,

  // Pauses et moments de détente
  `Quel nouveau hobby bizarre un collègue va-t-il adopter pendant sa pause déjeuner ?`,
  `Qui remportera le tournoi éclair de mini-golf dans le couloir ?`,
  `Quelle sera la prochaine mode alimentaire qui envahira la salle de pause ?`,

  // École et cours
  `Qui sera le premier à s'endormir pendant le prochain cours ?`,
  `Combien de fois le prof de maths utilisera-t-il le mot "donc" dans son prochain cours ?`,
  `Quel élève posera la question qui fera durer le cours 10 minutes de plus ?`,
  `Qui réussira à terminer le marathon des partiels sans overdose de café ?`,
  `Quel prof surprendra tout le monde avec un cours totalement déjanté ?`,
];

export function getRandomQuestionPlaceholder(): string {
  return questionPlaceholders[Math.floor(Math.random() * questionPlaceholders.length)];
}
