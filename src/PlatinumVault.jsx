import React, { useState, useEffect } from 'react';

export default function PlatinumVault({ onBack }) {
    // 1. State to hold live trophy data
    const [trophies, setTrophies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    // 2. Fetch trophy JSON on load
    useEffect(() => {
        fetch('replaceWithEndPoint')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load trophy vault data');
                return res.json();
            })
            .then((data) => {
                //Filter everything except platinum
                const platinumsOnly = data.filter((t) => t.isPlatinum || t.earnedTrophies?.platinum > 0);
                setTrophies(platinumsOnly);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Unable to connect...');
                setLoading(false);
            });
    }, []);

    const filteredTrophies = trophies.filter(
        (t) => activeFilter === 'all' || (t.category.includes(activeFilter))
    );

return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <button style={styles.backBtn} onClick={onBack}>
          &larr; Return to Portal
        </button>
        <div style={styles.counter}>
          Total Platinum Trophies: <strong>{trophies.length}</strong>
        </div>
      </nav>

      <header style={styles.header}>
        <h1 style={styles.title}>Platinum Archives</h1>
        <p style={styles.subtitle}>
          "Conquered horrors, physical trials, and digital torment."
        </p>
      </header>

      {/* Filter Buttons */}
      <div style={styles.filters}>
        {['all', 'horror', 'hardest', 'favorites'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={{
              ...styles.filterBtn,
              ...(activeFilter === cat ? styles.filterBtnActive : {})
            }}
          >
            {cat === 'all' ? 'All Relics' : cat}
          </button>
        ))}
      </div>

      {/* Loading & Error States */}
      {loading && <p style={{ textAlign: 'center', color: '#94a3b8' }}>Summoning relics from PSN...</p>}
      {error && <p style={{ textAlign: 'center', color: '#ef4444' }}>{error}</p>}

      {/* Trophy Cards */}
      {!loading && !error && (
        <div style={styles.grid}>
          {filteredTrophies.map((trophy) => (
            <div key={trophy.id || trophy.titleName} style={styles.card}>
              <div style={styles.cardHeader}>
                <img 
                  src={trophy.icon || trophy.conceptIconUrl} 
                  alt={trophy.title || trophy.titleName} 
                  style={styles.icon} 
                />
                <div>
                  <h3 style={styles.gameTitle}>{trophy.title || trophy.titleName}</h3>
                  <div style={styles.badge}>🏆 {trophy.trophyName || 'Platinum Achieved'}</div>
                </div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.details}>
                  <span>Unlocked: {trophy.date || 'Recorded'}</span>
                  <span>Rarity: {trophy.rarity || 'Ultra Rare'}</span>
                </div>
                {trophy.notes && <p style={styles.notes}>"{trophy.notes}"</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem 1rem',
    maxWidth: '1100px',
    margin: '0 auto',
    color: '#e2e8f0',
    minHeight: '100vh'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '1px solid #22222e',
    paddingBottom: '1rem'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#8b5cf6',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  counter: { fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' },
  header: { textAlign: 'center', marginBottom: '2.5rem' },
  title: {
    fontSize: '2.5rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#8b5cf6',
    textShadow: '0 0 12px rgba(139, 92, 246, 0.4)'
  },
  subtitle: { color: '#94a3b8', fontStyle: 'italic' },
  filters: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' },
  filterBtn: {
    background: '#111116',
    border: '1px solid #22222e',
    color: '#94a3b8',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontSize: '0.8rem'
  },
  filterBtnActive: {
    borderColor: '#8b5cf6',
    color: '#e2e8f0',
    boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  card: {
    background: '#111116',
    border: '1px solid #22222e',
    borderRadius: '8px',
    padding: '1.25rem'
  },
  cardHeader: { display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' },
  icon: { width: '56px', height: '56px', borderRadius: '6px' },
  gameTitle: { fontSize: '1.1rem', margin: 0 },
  badge: { fontSize: '0.75rem', color: '#e0f2fe', marginTop: '0.25rem' },
  cardBody: { borderTop: '1px solid #22222e', paddingTop: '0.75rem' },
  details: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' },
  notes: { fontSize: '0.85rem', color: '#cbd5e1', fontStyle: 'italic', margin: 0 }
};
