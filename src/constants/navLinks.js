const navItems = [
  { 
    name: "MEDICAL TOPICS", 
    href: "#",
    megaMenu: {
      sections: [
        {
          title: "Index",
          type: "alphabet",
          items: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        },
        {
          title: "Sections",
          type: "list",
          columns: [
            [
              "Allergy and Immunology",
              "Cardiology",
              "Clinical Pharmacology",
              "Critical Care Medicine",
              "Dentistry",
              "Dermatology",
              "Endocrinology",
              "Gastroenterology",
              "Geriatrics",
              "Gynecology and Obstetrics",
              "Hematology",
              "Hepatology",
              "Infectious Disease"
            ],
            [
              "Inquiries; Poisoning",
              "Nephrology",
              "Neurology",
              "Nutrition",
              "Oncology",
              "Ophthalmology",
              "Otolaryngology",
              "Pediatrics",
              "Psychiatry",
              "Pulmonology",
              "Rheumatology and Orthopedics",
              "Special Subjects",
              "Urology"
            ]
          ]
        }
      ]
    }
  },
  { 
    name: "RESOURCES", 
    href: "#",
    megaMenu: {
      columns: [
        {
          title: "Clinical Tools",
          links: [
            { name: "Drug Database", href: "#" },
            { name: "Calculators", href: "#" },
            { name: "Guidelines", href: "#" },
            { name: "Patient Education", href: "#" }
          ]
        },
        {
          title: "Multimedia",
          links: [
            { name: "Videos", href: "#" },
            { name: "Images", href: "#" },
            { name: "3D Models", href: "#" },
            { name: "Podcasts", href: "#" }
          ]
        }
      ]
    }
  },
  { name: "COMMENTARY", href: "#" },
  { name: "PROCEDURES", href: "#" },
  { name: "QUIZZES", href: "#" },
];

export default navItems;