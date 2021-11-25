const itemListGender = [
    {id: 0, key: "gender-default" ,value: "default", text: "Cliquer ici pour choisir votre genre", disabled : true},
    {id: 1, key: "gender-1" ,value: "F", text: "Femme"},
    {id: 2, key: "gender-2", value: "H", text: "Homme"},
    {id: 3, key: "gender-3", value: "NaN", text: "Non renseigné"},
]

const iemListStudieLevel = [
    {id: 0, key: "studieLevel-default" ,value: "default", text: "Cliquer ici pour choisir votre niveau d'étude", disabled : true},
    {id: 1, key: "studieLevel-1" ,value: "1", text: "BAC +1"},
    {id: 2, key: "studieLevel-2" ,value: "2", text: "BAC +2"},
    {id: 3, key: "studieLevel-3" ,value: "3", text: "BAC +3"},
    {id: 4, key: "studieLevel-4" ,value: "4", text: "BAC +4"},
    {id: 5, key: "studieLevel-5" ,value: "5", text: "BAC +5"},
    {id: 6, key: "studieLevel-6" ,value: "6", text: "Superieur a BAC +5"},
    {id: 7, key: "studieLevel-pro" ,value: "7", text: "BAC PRO"},
    {id: 8, key: "studieLevel-bepcap" ,value: "8", text: "BEP ou CAP"},
]

const iemListHeadquarters= [
    {id: 0, key: "headquarters-default", value: "default", text: "Cliquer ici pour choisir votre état major", disabled : true},
    {id: 1, key: "headquarters-air", value: "1", text: "Etat major de l'air et de l'espace"},
    {id: 2, key: "headquarters-earth", value: "2", text: "Etat major de la terre"},
    {id: 3, key: "headquarters-water", value: "3", text: "Etat major de l'eau"},
    {id: 4, key: "headquarters-gendarmerie", value: "4", text: "Etat major de la gendarmerie"},
    {id: 6, key: "headquarters-sga", value: "4", text: "Etat major des SGA"},
    {id: 7, key: "headquarters-other", value: "5", text: "Etat major (Agents secret ect ...)"}
]

const itemListFatigueLevel = [
    {id: 1, key: "fatigueLevel-1", label: 1},
    {id: 2, key: "fatigueLevel-2", label: 2},
    {id: 3, key: "fatigueLevel-3", label: 3},
    {id: 4, key: "fatigueLevel-4", label: 4},
    {id: 5, key: "fatigueLevel-5", label: 5},
    {id: 6, key: "fatigueLevel-6", label: 6},
    {id: 7, key: "fatigueLevel-7", label: 7},
    {id: 8, key: "fatigueLevel-8", label: 8},
    {id: 9, key: "fatigueLevel-9", label: 9},
    {id: 10, key: "fatigueLevel-10", label: 10},
]
const commonIndicator = [
    {id: 1, value: "Yeux plus ou moins ouverts", isChecked: false},
    {id: 2, value: "Muscles du visage plus ou moins relâchés Tête plus ou moins baissée", isChecked: false},
    {id: 3, value: "Clignement des yeux", isChecked: false},
    {id: 4, value: "Bouche plus ou moins ouverte", isChecked: false}
  ]

const configurationData = {
    tasks_list: {
      'task_1': { id: 'task_1', content: 'Take out the garbage' },
      'task_2': { id: 'task_2', content: 'Watch my favorite show' },
      'task_3': { id: 'task_3', content: 'Charge my phone' },
      'task_4': { id: 'task_4', content: 'Cook dinner' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Video dipsonible',
        taskIds: ['task_1', 'task_2', 'task_3', 'task_4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'Video de la session',
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2'],
    pathToExportData: ""
    };
  

export {
    itemListGender, 
    iemListStudieLevel,
    itemListFatigueLevel,
    iemListHeadquarters,
    commonIndicator, 
    configurationData
}