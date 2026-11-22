// Content model shared by the site and the admin. Add a section or field here and both update.
window.SCHEMA = {
  profile: { label: "Profile", single: true, fields: [
    ["name","Name"],["headline","Headline"],["tagline","Tagline"],["intro","Introduction","textarea"],
    ["about","About me","textarea"],["objective","Career objective","textarea"],
    ["email","Email"],["linkedin","LinkedIn URL"],["github","GitHub URL"],
    ["photo","Profile photo","file","image/*"],["resume","Resume (PDF)","file","application/pdf"]]},
  projects: { label: "Projects", fields: [
    ["title","Title"],["description","Description","textarea"],["tech","Technologies (comma separated)"],
    ["github","GitHub link"],["demo","Live demo link"],["status","Status","select",["Completed","In Progress"]],
    ["image","Project image","file","image/*"]]},
  skills: { label: "Skills", fields: [["category","Category"],["name","Skill"]]},
  certificates: { label: "Certificates", fields: [
    ["name","Certificate name"],["issuer","Issuing organization"],["date","Completion date"],
    ["link","Verification link"],["file","Image or PDF","file","image/*,application/pdf"]]},
  education: { label: "Education", fields: [
    ["title","Qualification"],["institution","Institution"],["period","Year / period"],["details","Details","textarea"]]},
  experience: { label: "Experience", fields: [
    ["title","Role"],["org","Organization"],["duration","Duration"],["description","Responsibilities","textarea"]]},
  achievements: { label: "Achievements", fields: [["title","Title"],["description","Details","textarea"]]},
  interests: { label: "Career interests", fields: [["title","Title"],["description","Details","textarea"]]},
  extras: { label: "More (papers, workshops, hackathons, blog…)", fields: [
    ["type","Type"],["title","Title"],["subtitle","Subtitle"],["date","Date"],["description","Description","textarea"],["link","Link"]]}
};
