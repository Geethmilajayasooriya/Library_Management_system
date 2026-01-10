import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/contact', {
        name,
        email,
        subject,
        message,
      });
      if (res.data.success) {
        setStatus({ type: 'success', text: 'Message sent — we will contact you soon.' });
        setName(''); setEmail(''); setSubject(''); setMessage('');
      } else {
        setStatus({ type: 'error', text: res.data.message || 'Failed to send message' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: err.response?.data?.message || 'Failed to send message' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-main mt-4">
      <div className="card mx-auto" style={{maxWidth:800}}>
        <h2>Contact us</h2>
        <p className="text-muted">Have a question or need help? Send us a message and we'll get back to you.</p>
        {status && (
          <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}>{status.text}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Your name</label>
            <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input className="form-control" value={subject} onChange={(e)=>setSubject(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows={5} value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;