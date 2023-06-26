const itemListGender = [
  {
    id: 0,
    key: "gender-default",
    value: "default",
    text: "Cliquer ici pour choisir votre genre",
    disabled: true,
  },
  { id: 1, key: "gender-1", value: "F", text: "Femme" },
  { id: 2, key: "gender-2", value: "H", text: "Homme" },
  { id: 3, key: "gender-3", value: "NaN", text: "Non renseigné" },
];

const iemListStudieLevel = [
  {
    id: 0,
    key: "studieLevel-default",
    value: "default",
    text: "Cliquer ici pour choisir votre niveau d'étude",
    disabled: true,
  },
  {
    id: 1,
    key: "studieLevel-0",
    value: "1",
    text: "BAC (ou Équivalent du BAC)",
  },
  { id: 1, key: "studieLevel-1", value: "1", text: "BAC +1" },
  { id: 2, key: "studieLevel-2", value: "2", text: "BAC +2" },
  { id: 3, key: "studieLevel-3", value: "3", text: "BAC +3" },
  { id: 4, key: "studieLevel-4", value: "4", text: "BAC +4" },
  { id: 5, key: "studieLevel-5", value: "5", text: "BAC +5" },
  { id: 6, key: "studieLevel-6", value: "6", text: "Superieur a BAC +5" },
  { id: 7, key: "studieLevel-pro", value: "7", text: "BAC PRO" },
  { id: 8, key: "studieLevel-bepcap", value: "8", text: "BEP ou CAP" },
];

const iemListStudieLevelStudent = [
  {
    id: 0,
    key: "studieLevel-default",
    value: "default",
    text: "Cliquer ici pour choisir votre niveau d'étude",
    disabled: true,
  },
  {
    id: 1,
    key: "studieLevel-0",
    value: "1",
    text: "ING 1 (L1)",
  },
  { id: 1, key: "studieLevel-1", value: "1", text: "ING 2 (L2)" },
  { id: 2, key: "studieLevel-2", value: "2", text: "ING 3 (L3)" },
  { id: 3, key: "studieLevel-3", value: "3", text: "ING 4 (M1)" },
  { id: 4, key: "studieLevel-4", value: "4", text: "ING 5 (M2)" },
];

const iemListGrade = [
  {
    id: 0,
    key: "grade-default",
    value: "default",
    text: "Cliquer ici pour choisir votre grade",
    disabled: true,
  },
  { id: 1, key: "grade-1", value: "1", text: "Soldat 2ème classe" },
  { id: 2, key: "grade-2", value: "2", text: "Soldat 1ère classe" },
  { id: 3, key: "grade-3", value: "3", text: "Caporal" },
  { id: 4, key: "grade-4", value: "4", text: "Caporal Chef" },
  { id: 5, key: "grade-5", value: "5", text: "Sergent" },
  { id: 6, key: "grade-6", value: "6", text: "Sergent Chef" },
  { id: 7, key: "grade-7", value: "7", text: "Adjudant" },
  { id: 8, key: "grade-8", value: "8", text: "Adjudant Chef" },
  { id: 9, key: "grade-9", value: "9", text: "Major" },
  { id: 10, key: "grade-10", value: "10", text: "Sous Lieutenant" },
  { id: 11, key: "grade-11", value: "11", text: "Lieutenant (Enseigne de Vaisseau)" },
  { id: 12, key: "grade-12", value: "12", text: "Capitaine (Lieutenant de Vaisseau)" },
  { id: 13, key: "grade-13", value: "13", text: "Commandant (Capitaine de corvette)" },
  { id: 14, key: "grade-14", value: "14", text: "Lieutenant-Colonel (Capitaine de frégate)" },
  { id: 15, key: "grade-15", value: "15", text: "Colonel (Capitaine de vaisseau)" },
  { id: 16, key: "grade-16", value: "16", text: "Général" },
  ];

const iemListHeadquarters = [
  {
    id: 0,
    key: "headquarters-default",
    value: "default",
    text: "Cliquer ici pour choisir votre état major",
    disabled: true,
  },
  {
    id: 1,
    key: "headquarters-air",
    value: "1",
    text: "Armée de l'Air et de l'Espace",
  },
  { id: 2, key: "headquarters-earth", value: "2", text: "Armée de Terre" },
  { id: 3, key: "headquarters-water", value: "3", text: "Marine Nationale" },
  {
    id: 4,
    key: "headquarters-gendarmerie",
    value: "4",
    text: "Gendarmerie Nationnale",
  },
  { id: 5, key: "headquarters-sga", value: "5", text: "DGA" },
  {
    id: 6,
    key: "headquarters-other",
    value: "6",
    text: "Autres services (SSA, ect.)",
  },
  { id: 7, key: "headquarters-firemen", value: "7", text: "Pompiers" },
];

const itemListFatigueLevelPratical = [
  { id: 1, key: "fatigueLevel-1", label: 1 },
  { id: 2, key: "fatigueLevel-2", label: 2 },
  { id: 3, key: "fatigueLevel-3", label: 3 },
  { id: 4, key: "fatigueLevel-4", label: 4 },
  { id: 5, key: "fatigueLevel-5", label: 5 },
  { id: 6, key: "fatigueLevel-6", label: 6 },
  { id: 7, key: "fatigueLevel-7", label: 7 },
  { id: 8, key: "fatigueLevel-8", label: 8 },
  { id: 9, key: "fatigueLevel-9", label: 9 },
  { id: 10, key: "fatigueLevel-10", label: 10 },
];

const itemListFatigueLevelTheorical = [
  { id: 1, key: "fatigueLevel-1", label: 1 },
  { id: 2, key: "fatigueLevel-2", label: 2 },
  { id: 3, key: "fatigueLevel-3", label: 3 },
  { id: 4, key: "fatigueLevel-4", label: 4 },
  { id: 5, key: "fatigueLevel-5", label: 5 },
  { id: 6, key: "fatigueLevel-6", label: 6 },
  { id: 7, key: "fatigueLevel-7", label: 7 },
  { id: 8, key: "fatigueLevel-8", label: 8 },
  { id: 9, key: "fatigueLevel-9", label: 9 },
  { id: 10, key: "fatigueLevel-10", label: 10 },
];

const commonIndicator = [
  { id: 1, value: "Yeux plus ou moins ouverts", isChecked: false },
  { id: 2,value: "Muscles du visage plus ou moins relâchés",isChecked: false,},
  { id: 3, value: "Tête plus ou moins baissée", isChecked: false },
  { id: 4, value: "Clignement des yeux", isChecked: false },
  { id: 5, value: "Bouche plus ou moins ouverte", isChecked: false },
  { id: 6, value: "Front plus ou moins plissé/ridé", isChecked: false },
];

const configurationData = {
  tasks_list: {
    task_1: { id: "task_1", content: "Take out the garbage" },
    task_2: { id: "task_2", content: "Watch my favorite show" },
    task_3: { id: "task_3", content: "Charge my phone" },
    task_4: { id: "task_4", content: "Cook dinner" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Video disponible",
      taskIds: ["task_1", "task_2", "task_3", "task_4"],
    },
    "column-2": {
      id: "column-2",
      title: "Video de la session",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2"],
  pathToExportData: "",
};

const itemListSequenceLevel = [
  { id: 0, key: "sequence-0", label: 0 },
  { id: 15, key: "sequence-15", label: 15 },
  { id: 30, key: "sequence-30", label: 30 },
  { id: 45, key: "sequence-45", label: 45 },
];

export {
  itemListGender,
  iemListStudieLevel,
  itemListFatigueLevelTheorical,
  itemListFatigueLevelPratical,
  iemListGrade,
  iemListHeadquarters,
  commonIndicator,
  configurationData,
  itemListSequenceLevel,
  iemListStudieLevelStudent,
};
