import { useState } from 'react';

const photos = [
  { src: '/images/landscape1.jpg', title: 'Golden Hour', category: 'Landscape' },
  { src: '/images/street1.jpg', title: 'Rainy Alley', category: 'Street' },
  { src: '/images/portrait1.jpg', title: 'Daydream', category: 'Portrait' },
];

export default function Home() {
  const [filter, setFilter] = useState('All');
  const filteredPhotos = filter === 'All' ? photos : photos.filter(p => p.category === filter);

  return (
    <main style={{ background: '#f8f4f0', minHeight: '100vh', fontFamily: 'serif', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Moments on Film</h1>
        <p style={{ marginTop: '0.5rem', maxWidth: '30rem' }}>A curated collection of fleeting moments — captured softly on film.</p>
      </header>

      <div style={{ marginBottom: '1.5rem' }}>
        {['All', 'Landscape', 'Portrait', 'Street'].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            marginRight: '0.5rem',
            padding: '0.5rem 1rem',
            background: filter === cat ? '#000' : '#ddd',
            color: filter === cat ? '#fff' : '#000',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {filteredPhotos.map((photo, i) => (
          <div key={i} style={{ borderRadius: '1rem', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <img src={photo.src} alt={photo.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{photo.title}</h3>
              <p style={{ color: '#555' }}>{photo.category}</p>
            </div>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '4rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.6 }}>
        © 2025 archive21. All rights reserved.
      </footer>
    </main>
  );
}
