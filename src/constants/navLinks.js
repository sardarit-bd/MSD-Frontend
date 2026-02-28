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
  {
    name: "COMMENTARY",
    href: "#",
    megaMenu: {
      articles: [
        {
          title: "The Environmental Effects of Climate Change on Human Health: An Overview",
          category: "Commentary",
          date: "11/14/24",
          image: "/commentary/1.jpg"
        },
        {
          title: "Understanding One Health",
          category: "Commentary",
          date: "11/05/24",
          image: "/commentary/2.jpg"
        },
        {
          title: "Explore Our One Health Page",
          category: "Commentary",
          date: "10/28/24",
          image: "/commentary/3.jpg"
        },
        {
          title: "Commentary: Nirsevimab Prevents Bronchiolitis in Premature Infants",
          category: "Commentary",
          date: "07/20/23",
          image: "/commentary/4.jpg"
        },
        {
          title: "How the MSD Manuals team is helping first responders in Ukraine",
          category: "Commentary",
          date: "07/14/22",
          image: "/commentary/5.jpg"
        },
        {
          title: "The MSD Manuals Have a New Editor-in-Chief",
          category: "Commentary",
          date: "11/08/21",
          image: "/commentary/6.jpg"
        },
        {
          title: "Commentary: Avoiding the vowels in pursuit of good laboratory stewardship: AEIOU…And always ‘Why’",
          category: "Commentary",
          date: "08/10/21",
          image: "/commentary/7.jpg"
        },
        {
          title: "Commentary: As We Seek Out More Medical Information, Trusted Sources Remain Essential",
          category: "Commentary",
          date: "07/08/21",
          image: "/commentary/8.jpg"
        },
        {
          title: "Commentary—Coffee and Cardiac Tachyarrhythmias",
          category: "Commentary",
          date: "06/01/21",
          image: "/commentary/9.jpg"
        },
        {
          title: "Commentary: Is Time to Deep Freeze Hypothermia After Cardiac Arrest",
          category: "Commentary",
          date: "05/12/21",
          image: "/commentary/10.jpg"
        }
      ]
    }
  },
  {
    name: "PROCEDURES",
    href: "#",
    megaMenu: {
      categories: [
        {
          title: "Cardiology",
          count: 4,
          image: "/procedures/cardiology.jpg",
          items: [
            "How To Do Synchronized Cardioversion In An Adult",
            "How to Do Transcutaneous Pacing in an Adult",
            "How to Insert a Transvenous Pacemaker",
            "Ultrasound-Guided Pericardiocentesis"
          ]
        },
        {
          title: "Critical Care Medicine",
          count: 36,
          image: "/procedures/critical-care.jpg",
          items: [
            "Extended Focused Assessment With Sonography in Trauma (E-FAST)",
            "How To Do a Cricothyrotomy Using a Guidewire",
            "How To Do Abdominal Thrusts in the Conscious Adult Who Is Choking",
            "How To Do Bag-Valve-Mask Ventilation",
            "How To Do Cardiopulmonary Resuscitation (CPR) in Adults",
            "How To Insert a Laryngeal Mask Airway",
            "Orotracheal Intubation",
            "Percutaneous Cannulation of the Femoral Vein"
          ]
        },
        {
          title: "Dentistry",
          count: 7,
          image: "/procedures/dentistry.jpg",
          items: [
            "How To Do a Mental Nerve Block",
            "How To Do a Middle Superior Alveolar Nerve Block",
            "How To Do a Posterior Superior Alveolar Nerve Block",
            "How To Do a Supraperiosteal Infiltration"
          ]
        },
        {
          title: "Dermatology",
          count: 1,
          image: "/procedures/dermatology.jpg",
          items: [
            "How To Drain a Subungual Hematoma"
          ]
        },
        {
          title: "Gastroenterology",
          count: 4,
          image: "/procedures/gastro.jpg",
          items: [
            "How To Do Anoscopy",
            "How To Insert a Nasogastric Tube",
            "How To Do Hemorrhoidal Thrombectomy",
            "Paracentesis"
          ]
        }
      ]
    }
  },
  { name: "QUIZZES", href: "#" },
];

export default navItems;