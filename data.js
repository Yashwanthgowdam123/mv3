/* ==========================================================
   ALL PROFILE CONTENT LIVES HERE (hardcoded, no backend).
   Edit this file only; the page renders itself from it.
   Photos: put files in /media and reference them below.
   Missing photos automatically show an initials placeholder.
   ========================================================== */
const PROFILE = {
  personal: {
    photo: "media/profile.jpg",
    name: "Yashwanth Gowda M",
    profession: "Senior DevOps Engineer",
    education: "B.E. in Electrical & Electronics Engineering",
    dob: "2000-03-26",            // YYYY-MM-DD (age is auto-calculated)
    dobDisplay: "26 March 2000",
    birthTime: "12:32 PM",
    birthPlace: "Kempegowda International Medical Science Hospital, Bengaluru, Karnataka",
    address: "Nanjundeshwara Nilaya, Hanumapur, Begur Post, Kasaba Hobli, Kunigal Taluk, Tumakuru, Karnataka – 572130",
    mapUrl: "https://maps.app.goo.gl/Me9UfVFMrAQX2R9z6",
    bloodGroup: "O +ve",
    currentCity: "Bengaluru, Karnataka"
  },

  family: [
    {
      photo: "media/father.jpg",
      relation: "Father",
      name: "Mahadevaiah H",
      occupation: "Primary Government School Teacher, Kithnamangla",
      dob: "06 March 1970",
      native: "RM Palya, Huthridurga, Kunigal Taluk"
    },
    {
      photo: "media/mother.jpg",
      relation: "Mother",
      name: "Sunandamma C",
      occupation: "Homemaker",
      dob: "16 February 1977",
      native: "HM Doddi, Bidadi, Ramanagara"
    },
    {
      photo: "media/sister.jpg",
      relation: "Elder Sister",
      name: "Shalini M",
      occupation: "Homemaker",
      dob: "20 June 1998",
      native: "Married"
    }
  ],

  astrology: {
    rashi: "Scorpio (Vrishchika)",
    nakshatra: "Jyeshtha",
    god: "Nanjundeshwara",
    goddess: "Honnadevi"
  },

  professional: {
    company: "HCLTech",
    role: "Senior DevOps Engineer",
    experience: "5 Years",
    ctc: "₹15 LPA"
  },

  education: {
    degree: "B.E. in Electrical & Electronics Engineering",
    college: "SJB Institute of Technology, Kengeri, Bengaluru",
    yop: "2022",
    score: "7.98 CGPA"
  },

  /* Fill these in: leave "" to hide an item */
  contact: {
    phone: "",                    // e.g. "+91 98765 43210"
    whatsapp: "",                 // digits only with country code, e.g. "919876543210"
    email: "",
    linkedin: "",                 // full URL
    instagram: "",                // full URL
    github: "",                   // full URL
    facebook: ""                  // full URL
  },

  /* Files inside /media (GitHub). Add or remove names freely. */
  gallery: [
    { src: "media/gallery-1.jpg", caption: "" },
    { src: "media/gallery-2.jpg", caption: "" },
    { src: "media/gallery-3.jpg", caption: "" },
    { src: "media/gallery-4.jpg", caption: "" },
    { src: "media/gallery-5.jpg", caption: "" },
    { src: "media/gallery-6.jpg", caption: "" }
  ]
};
