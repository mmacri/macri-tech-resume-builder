// Debug: Temporary logging to confirm export
console.log('aboutData.ts loaded and exporting data');

export const initialAboutData = {
  intro_text: "Solution Advisory and value identification Leader with a proven track record of building high-performing Solution Engineering and Customer Success teams in the enterprise cloud ecosystem. Expert in coaching Solution Consultants, developing scalable technical sales strategies, and delivering measurable growth with SIs, MSPs, and ISVs.",
  
  title: "Solution Advisory and value identification Leader",
  location: "Available in: Edmonds, WA | San Diego, CA | Chicago, IL | Denver, CO | Remote/Hybrid",
  
  contact: {
    email: "mike@mikemacri.com",
    phone: "+1 (555) 123-4567",
    location: "Available in: Edmonds, WA | San Diego, CA | Chicago, IL | Denver, CO | Remote/Hybrid",
    linkedin: "https://www.linkedin.com/in/mikemacri/"
  },
  
  references: [
    "I have worked with Mike for the past 5 years during my time as an Enterprise Sales Exec at VMware. From Day 1 Mike has been a tremendous business partner (not only to me but most importantly, to my customers). Mike leads by example in holding himself and his team accountable resulting in the highest levels of customer satisfaction and building long-term, trusted, customer relationships. Working with Mike has been a pleasure; his attention to detail, work ethic, and unyielding commitment to delivering customer business goals & outcomes has been invaluable.",
    
    "I find Mike to be a manager that is a true mentor, coach, and leader. Mike not only guides but listens. When I found myself in a quandary his 'Next Step' has always got me further in my endeavors, from customer maturity to conversations with Directors and above we always moved the needle."
  ]
};

// Export both for compatibility - this should fix the import error
export const aboutData = initialAboutData;

// Debug: Log the export to confirm it's available
console.log('aboutData exported:', aboutData);