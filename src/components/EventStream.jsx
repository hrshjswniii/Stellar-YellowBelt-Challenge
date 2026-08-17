import React from 'react';
import { Activity, Radio, ArrowUpRight, CheckCircle, Zap } from 'lucide-react';

export default function EventStream({ events }) {
  return (
    <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={styles.iconContainer}>
            <Radio size={18} color="#06b6d4" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', margin: 0 }}>Real-Time Event Stream</h3>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
              Soroban Contract Event Subscriptions
            </p>
          </div>
        </div>
        <span className="badge badge-live">
          <span className="pulsing-dot" /> STREAMING
        </span>
      </div>

      <div style={styles.streamList}>
        {events.length === 0 ? (
          <div style={styles.emptyState}>
            <Activity size={32} color="#64748b" />
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '8px' }}>
              Waiting for live contract events...
            </p>
          </div>
        ) : (
          events.map((evt, idx) => (
            <div key={evt.id || idx} style={styles.eventCard} className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={styles.eventTypeBadge(evt.type)}>
                    <Zap size={14} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                      {evt.title}
                    </span>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                      {evt.details}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  {evt.timestamp}
                </span>
              </div>
              <div style={{ marginTop: '8px', fontSize: '0.72rem', color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>Topic: {evt.topic || 'soroban::event::publish'}</span>
                <ArrowUpRight size={12} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  iconContainer: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'rgba(6, 182, 212, 0.12)',
    border: '1px solid rgba(6, 182, 212, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streamList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '420px',
    overflowY: 'auto',
    paddingRight: '4px',
  },
  emptyState: {
    padding: '40px 20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '16px',
    border: '1px stroke rgba(255, 255, 255, 0.05)',
  },
  eventCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
    borderRadius: '14px',
    padding: '12px 14px',
  },
  eventTypeBadge: (type) => ({
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: type === 'bid' ? 'rgba(124, 58, 237, 0.2)' : 'rgba(16, 185, 129, 0.2)',
    color: type === 'bid' ? '#a78bfa' : '#34d399',
  })
};
