import { useState, useEffect } from 'react';
const ADMIN_PASS = 'Bela2026!';
const ADMIN_KEY = 'kairos_is_admin';

function safeEncode(obj) {
  const json = JSON.stringify(obj);
  let b64 = btoa(json);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [email, setEmail] = useState('');
  const [ultimoLink, setUltimoLink] = useState('');

  useEffect(() => {
    if (localStorage.getItem(ADMIN_KEY) === 'true') setIsAdmin(true);
  }, []);

  const login = () => {
    if (passInput === ADMIN_PASS) {
      localStorage.setItem(ADMIN_KEY, 'true');
      setIsAdmin(true);
    } else alert('Senha: Bela2026!');
  };

  const gerarLink = () => {
    if (!email.includes('@')) return alert('Email invalido');
    const id = safeEncode({ email: email, t: Date.now() });
    setUltimoLink(window.location.origin + '/pay/' + id);
  };

  if (!isAdmin)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0a0a0a',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: '#18181b',
            padding: 30,
            borderRadius: 16,
            width: 360,
          }}
        >
          <h2>Admin Kairos</h2>
          <input
            type="password"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            placeholder="Senha"
            style={{
              width: '100%',
              padding: 12,
              marginTop: 12,
              borderRadius: 8,
              background: '#000',
              color: '#fff',
              border: '1px solid #333',
            }}
          />
          <button
            onClick={login}
            style={{
              width: '100%',
              marginTop: 12,
              padding: 12,
              background: '#00ff66',
              border: 'none',
              borderRadius: 8,
              fontWeight: 'bold',
            }}
          >
            ENTRAR
          </button>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#fff',
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <h2>Logada como ADMIN</h2>
        <div
          style={{
            background: '#18181b',
            padding: 20,
            borderRadius: 16,
            marginTop: 20,
          }}
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="cliente@gmail.com"
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              background: '#000',
              color: '#fff',
              border: '1px solid #333',
            }}
          />
          <button
            onClick={gerarLink}
            style={{
              width: '100%',
              marginTop: 12,
              padding: 12,
              background: '#00ff66',
              color: '#000',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 8,
            }}
          >
            Gerar Link
          </button>
          {ultimoLink && (
            <div
              style={{
                marginTop: 20,
                padding: 15,
                background: '#000',
                borderRadius: 10,
                border: '1px solid #00ff66',
              }}
            >
              <p style={{ wordBreak: 'break-all', fontSize: 11 }}>
                {ultimoLink}
              </p>
              <button
                onClick={() =>
                  (window.location.href = ultimoLink.replace(
                    window.location.origin,
                    ''
                  ))
                }
                style={{
                  width: '100%',
                  marginTop: 12,
                  padding: 10,
                  background: '#fff',
                  color: '#000',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: 6,
                }}
              >
                ABRIR LINK AGORA
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ultimoLink);
                  alert('Copiado!');
                }}
                style={{
                  width: '100%',
                  marginTop: 8,
                  padding: 10,
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                }}
              >
                COPIAR PARA WHATSAPP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
