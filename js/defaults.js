// Starter content from your brief. Used when Supabase isn't configured or has no published content.
// Admin > "Import starter content" copies this into the database as drafts.
window.DEFAULTS = {
 profile:[{name:"Sanjana Chinta",headline:"B.Tech Computer Engineering Student",tagline:"Aspiring Software Developer | AI & ML Enthusiast",
  intro:"Passionate about technology, programming and building practical solutions. I enjoy exploring Artificial Intelligence, Machine Learning, Data Analytics and Software Development while continuously improving my technical skills.",
  about:"I am a Direct Second Year B.Tech Computer Engineering student at A.G. Patil Institute of Technology. I completed my Diploma in Computer Technology from Government Polytechnic in 2026 with 90.18%. I completed a three-month internship at Zilla Parishad, Solapur, where I worked on website-related tasks as part of a group. My interests include AI and Machine Learning, Data Analytics, Database Management, Software and Web Development.",
  objective:"To continuously improve my technical knowledge, develop problem-solving skills and build a successful career in the technology industry.",
  email:"",linkedin:"https://www.linkedin.com/in/sanjana-chinta-b27b7b384/",github:"https://github.com/sanj31ch",photo:"",resume:""}],
 projects:[
  {title:"Library Management System",description:"A web-based system to manage library records and simplify book-related operations.",tech:"Python, Flask, MySQL",github:"https://github.com/sanj31ch/library-management-system",status:"Completed"},
  {title:"AI-Powered Smart Home Automation",description:"Controls lights, fans and a door lock through voice commands and connected hardware, with learning-based automation.",tech:"Python, Flask, ESP32, MySQL, Kivy, Machine Learning",github:"https://github.com/sanj31ch/AI-Smart-Home",status:"Completed"},
  {title:"Hostel Management System",description:"An academic project to organize hostel information and simplify record management.",tech:"",status:"Completed"},
  {title:"Attendance Management System",description:"A database-backed system that records attendance after user login.",tech:"",status:"Completed"},
  {title:"Scheme Tracking System",description:"An academic project for maintaining and tracking scheme-related information.",tech:"",status:"Completed"},
  {title:"MIS Report System",description:"Organizes information to support management reporting.",tech:"",status:"Completed"}],
 skills:[["Programming","C++"],["Programming","Java"],["Programming","Python (Basic)"],["Web Development","HTML"],["Web Development","CSS"],["Web Development","Flask"],
  ["Database","MySQL"],["Database","SQL (Basic)"],["Tools","Microsoft Excel"],["Tools","GitHub"],["Tools","Data Structures (Learning)"],
  ["Areas of Interest","Artificial Intelligence"],["Areas of Interest","Machine Learning"],["Areas of Interest","Data Analytics"]].map(([category,name])=>({category,name})),
 certificates:[["Internship Certificate","Zilla Parishad, Solapur"],["Java","Microsoft"],["C++","Microsoft"],["Data Structures","Microsoft"],["Infosys Springboard Certificate","Infosys Springboard"],
  ["Technical Quiz Participation","Soni Dhobi College"],["Technical Quiz – cleared two rounds","A.G. Patil Institute of Technology"]].map(([name,issuer])=>({name,issuer})),
 education:[{title:"B.Tech – Computer Engineering",institution:"A.G. Patil Institute of Technology",period:"Direct Second Year · Expected 2029",details:"Currently pursuing."},
  {title:"Diploma – Computer Technology",institution:"Government Polytechnic",period:"Completed 2026",details:"Percentage: 90.18%."}],
 experience:[{title:"Web Development Internship",org:"Zilla Parishad, Solapur",duration:"3 months",description:"Worked collaboratively on website-related tasks and gained practical exposure to website development, teamwork and real-world project activities."}],
 achievements:[{title:"Diploma with 90.18%"},{title:"Three-month internship"},{title:"Technical quiz participation"},{title:"Academic project development"}],
 interests:["AI & Machine Learning","Software Engineering","Data Analytics","Database Technologies","Web Development"].map(title=>({title})),
 extras:[]
};
