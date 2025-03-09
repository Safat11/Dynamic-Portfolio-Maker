import React, { useState } from "react";
import { jsPDF } from "jspdf";

const Portfolio = () => {
  const [fullName, setFullName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [bio, setBio] = useState("");
  const [softSkills, setSoftSkills] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState("");
  const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [projects, setProjects] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  const [photo, setPhoto] = useState(null);

  // Handle File Upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Work Experience
  const addWorkExperience = () => {
    setWorkExperience([...workExperience, { company: "", duration: "", responsibilities: "" }]);
  };

  // Remove Work Experience
  const removeWorkExperience = (index) => {
    const updatedWork = workExperience.filter((_, i) => i !== index);
    setWorkExperience(updatedWork);
  };

  // Handle Work Experience Change
  const handleWorkChange = (index, field, value) => {
    const updatedWork = [...workExperience];
    updatedWork[index][field] = value;
    setWorkExperience(updatedWork);
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Portfolio of ${fullName}`, 10, 10);
    doc.text(`Contact: ${contactInfo}`, 10, 20);
    doc.text(`Bio: ${bio}`, 10, 30);
    doc.text(`Soft Skills: ${softSkills}`, 10, 40);
    doc.text(`Technical Skills: ${technicalSkills}`, 10, 50);
    doc.text(`Academic Background: ${institute}, ${degree}, ${year}, ${grade}`, 10, 60);
    doc.text(`Projects/Publications: ${projects}`, 10, 70);

    workExperience.forEach((work, index) => {
      doc.text(`Work ${index + 1}: ${work.company}, ${work.duration}`, 10, 80 + index * 10);
      doc.text(`Responsibilities: ${work.responsibilities}`, 10, 90 + index * 10);
    });

    if (photo) {
      doc.addImage(photo, "JPEG", 10, 110, 50, 50);
    }

    doc.save("portfolio.pdf");
  };

  return (
    <div className="portfolio-form">
      <h2>Create Your Portfolio</h2>
      
      <label>Full Name:</label>
      <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />

      <label>Contact Information:</label>
      <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />

      <label>Upload a Photo (jpg/png):</label>
      <input type="file" accept=".jpg, .png" onChange={handlePhotoUpload} />
      {photo && <img src={photo} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}

      <label>Short Bio:</label>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

      <h3>Skills</h3>
      <label>Soft Skills:</label>
      <input type="text" value={softSkills} onChange={(e) => setSoftSkills(e.target.value)} />

      <label>Technical Skills:</label>
      <input type="text" value={technicalSkills} onChange={(e) => setTechnicalSkills(e.target.value)} />

      <h3>Academic Background (Optional)</h3>
      <label>Institute:</label>
      <input type="text" value={institute} onChange={(e) => setInstitute(e.target.value)} />

      <label>Degree:</label>
      <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} />

      <label>Year of Graduation:</label>
      <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />

      <label>Grade:</label>
      <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} />

      <h3>Work Experience</h3>
      {workExperience.map((work, index) => (
        <div key={index}>
          <label>Company:</label>
          <input type="text" value={work.company} onChange={(e) => handleWorkChange(index, "company", e.target.value)} />

          <label>Duration:</label>
          <input type="text" value={work.duration} onChange={(e) => handleWorkChange(index, "duration", e.target.value)} />

          <label>Responsibilities:</label>
          <textarea value={work.responsibilities} onChange={(e) => handleWorkChange(index, "responsibilities", e.target.value)} />

          <button type="button" onClick={() => removeWorkExperience(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addWorkExperience}>Add Work Experience</button>

      <h3>Projects/Publications (Optional)</h3>
      <label>Previous Projects/Publications:</label>
      <textarea value={projects} onChange={(e) => setProjects(e.target.value)} />

      <button type="button" onClick={generatePDF}>Generate Portfolio</button>
    </div>
  );
};

export default Portfolio;
