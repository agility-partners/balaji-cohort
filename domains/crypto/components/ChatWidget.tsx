'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export default function ChatWidget() {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#4F46E5',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        aria-label="Toggle chat"
      >
        💬
      </button>

      {/* Popup modal */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            width: '350px',
            maxHeight: '500px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '12px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: '#222' }}>Crypto Assistant</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#000000',
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {/* Chat UI */}
            {messages.map((msg) => (
              <div key={msg.id} style={{ color: '#222', marginBottom: '8px' }}>
                <strong>{msg.role}:</strong>{' '}
                {msg.parts
                  .filter((part) => part.type === 'text')
                  .map((part, i) => (
                    <span key={i}>{part.text}</span>
                  ))}
              </div>
            ))}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const text = input.trim();
                if (!text) return;

                sendMessage({ text });
                setInput('');
              }}
            >
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type your question..." 
                    style={{ 
                        color: '#222',
                        border: '1px solid #222',
                        borderRadius: '6px',
                        padding: '8px',
                        outline: 'none',
                        marginRight: '8px',
                        fontSize: '16px',
                        background: '#fff',
                    }}/>
                <button 
                    type="submit" 
                    disabled={status !== 'ready'} 
                    style={{ 
                        color: '#fff',
                        background: '#4F46E5',
                        border: '1px solid #222',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        fontSize: '16px',
                        cursor: status === 'ready' ? 'pointer' : 'not-allowed',
                        marginLeft: '4px',
                        fontWeight: 500,
                        transition: 'background 0.2s',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        opacity: status === 'ready' ? 1 : 0.6,
                    }}>
                    Send
                </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}