import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("YGVVJT0kuOQqrZl6q");

export const sendEmail = async (data) => {
  try {
    await emailjs.send(
      'service_4myxn7g',
      'template_1mxoo3y',
      data
    );
  } catch (error) {
    throw new Error('Failed to send email');
  }
};