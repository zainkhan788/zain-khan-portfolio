import emailjs from '@emailjs/browser';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_q4rhgrq';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_f5q5gli';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'I_bJ-JXTZG4iMw4Pz';

// Fallback project data matching MERN showcase requirements
export const fallbackProjects = [
  {
    _id: '1',
    title: 'AgriMatch',
    description: 'Agriculture recommendation app that helps farmers identify suitable crops based on soil type and location, with profit estimates and climate requirements.',
    image: 'https://res.cloudinary.com/gvwafzjq/image/upload/f_auto,q_auto/Agrimatch',
    technologies: ['React Native' , 'Expo' , 'TypeScript' , 'Node.js' , 'PostgreSQL'],
    githubUrl: 'https://github.com/zainkhan788/AgriMatch',
    liveUrl: 'https://agri-match-navy.vercel.app/',
    category: 'App'
  },
  {
    _id: '2',
    title: 'Taaza',
    description: 'A fresh food website that showcases organic and farm-fresh products, helping customers explore products, learn about their benefits, and easily get in touch with the business.',
    image: 'https://res.cloudinary.com/gvwafzjq/image/upload/f_auto,q_auto/Taaza',
    technologies: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
    githubUrl: 'https://github.com/zainkhan788/Taaza-Website',
    liveUrl: 'https://taaza-website.vercel.app/',
    category: 'Web'
  },

];

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Backend response error');
    const data = await res.json();
    return data.length > 0 ? data : fallbackProjects;
  } catch (err) {
    console.warn('Backend API offline or unreachable, using local fallback project dataset.');
    return fallbackProjects;
  }
};

export const sendContactMessage = async (formData) => {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
  };

  // Send email via EmailJS
  const response = await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );

  // Optional: Save to backend database asynchronously if server is running
  try {
    fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).catch(() => { });
  } catch (e) {
    // Ignore backend errors if offline
  }

  return response;
};