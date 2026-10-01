import { useEffect, useState } from 'react';
const TOKEN_KEY = 'kairos_auth_token';

function safeDecode(str) {
  try {
    let s = decodeURIComponent(str);
    s = s.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return JSON.parse(atob(s));
  } catch {
    return null;
  }
}

export default function PayLinkPage({ linkId }) {
  const [status, setStatus] = useState('verificando');

  useEffect(() => {
    const dados = safeDecode(linkId);
    if (dados && dados.email) {
      const token = 'kairos_' + btoa(dados.email + '|' + Date.now());
      localStorage.setItem(TOKEN_KEY, token);
      setStatus('ok');
    } else {
      setStatus('invalido');
    }
  }, [linkId]);

  if (status === 'verificando')
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#000',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Verificando...
      </div>
    );
  if (status === 'invalido')
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#000',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div style={{ fontSize: 60, color: '#ff4444' }}>❌</div>
        <p>Gere um novo link em /admin</p>
        <button
          onClick={() => (window.location.href = '/admin')}
          style={{
            padding: 12,
            background: '#00ff66',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
          }}
        >
          IR PARA /ADMIN
        </button>
      </div>
    );
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <div style={{ fontSize: 60 }}>✅</div>
      <h2>ACESSO LIBERADO!</h2>
      <button
        onClick={() => (window.location.href = '/')}
        style={{
          padding: 15,
          background: '#00ff66',
          color: '#000',
          border: 'none',
          borderRadius: 8,
          fontWeight: 'bold',
        }}
      >
        ABRIR APLICATIVO
      </button>
    </div>
  );
}
