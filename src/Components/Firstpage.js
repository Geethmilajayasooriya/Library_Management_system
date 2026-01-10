import React, { useEffect, useState } from 'react';
import './Firstpage.css';

function Firstpage() {
  const [counts, setCounts] = useState({ books: 0, members: 0, staff: 0, lending: 0 });
  const [loading, setLoading] = useState(true);
 
  const sources = [
    'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg',
    'https://images.pexels.com/photos/289780/pexels-photo-289780.jpeg', 
    '/hero-placeholder.svg' 
  ];
  const [srcIndex, setSrcIndex] = useState(0);
  const imgSrc = sources[srcIndex];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [b, m, s, l] = await Promise.all([
          fetch('http://localhost:8080/book').then(r=>r.json()),
          fetch('http://localhost:8080/member').then(r=>r.json()),
          fetch('http://localhost:8080/staff').then(r=>r.json()),
          fetch('http://localhost:8080/lending').then(r=>r.json()),
        ]);
        setCounts({ books: b.length || 0, members: m.length || 0, staff: s.length || 0, lending: l.length || 0 });
      } catch (err) {
        console.error('Failed to fetch counts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="container-main">
      <div className="home-hero card">
        <div className="hero-left">
          <h1>Easy library management for your community</h1>
          <p className="lead">Organize books, members and lending from a single, clean interface. Works great on mobile and desktop.</p>
          <div className="cta mt-3">
            <a href="/book" className="btn btn-primary me-2">Explore books</a>
            <a href="/lending" className="btn btn-outline-primary">Issue/Return</a>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="label text-muted">Books</div>
              <div className="num">{loading ? '—' : counts.books}</div>
            </div>
            <div className="stat-card">
              <div className="label text-muted">Members</div>
              <div className="num">{loading ? '—' : counts.members}</div>
            </div>
            <div className="stat-card">
              <div className="label text-muted">Staff</div>
              <div className="num">{loading ? '—' : counts.staff}</div>
            </div>
            <div className="stat-card">
              <div className="label text-muted">Active lending</div>
              <div className="num">{loading ? '—' : counts.lending}</div>
            </div>
          </div>
        </div>

        <div className="hero-right text-center">
          <img
            src={imgSrc}
            alt="library"
            loading="lazy"
            onError={() => {
              
              setSrcIndex((i) => Math.min(i + 1, sources.length - 1));
            }}
            style={{width:'100%',maxWidth:460,borderRadius:12,boxShadow:'0 14px 40px rgba(2,6,23,0.07)', objectFit:'cover'}}
          />
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <div className="icon">📚</div>
          <div>
            <h5>Inventory</h5>
            <p className="text-muted mb-0">Add, update and categorize books with ease.</p>
          </div>
        </div>
        <div className="feature">
          <div className="icon">👥</div>
          <div>
            <h5>Members</h5>
            <p className="text-muted mb-0">Track members, join dates, and membership status.</p>
          </div>
        </div>
        <div className="feature">
          <div className="icon">📝</div>
          <div>
            <h5>Lending</h5>
            <p className="text-muted mb-0">Issue books, record returns, and track due dates.</p>
          </div>
        </div>
        <div className="feature">
          <div className="icon">📊</div>
          <div>
            <h5>Reports</h5>
            <p className="text-muted mb-0">Export data and generate usage reports quickly.</p>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <h4>Public library — Weligama</h4>
        <p className="mb-0"><strong>Address:</strong> No.56, Galle Road, Weligama</p>
        <p className="mb-0"><strong>Contact:</strong> 0412260775</p>
        <p className="mb-0"><strong>Email:</strong> public_library@gmail.com</p>
      </div>

    </div>
  );
}

export default Firstpage;