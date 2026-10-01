import Admin from './Admin';
import PayLink from './PayLink';

export default function App() {
  const path = window.location.pathname;
  const token = localStorage.getItem('kairos_auth_token');

  if (path.startsWith('/admin')) return <Admin />;

  if (path.startsWith('/pay/')) {
    const id = path.split('/pay/')[1];
    return <PayLink linkId={id} />;
  }

  if (!token) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'black',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div style={{ fontSize: 60 }}>🔒</div>
        <p>Esse app está protegido por licença.</p>
        <p>
          <b>Gere um link em: /admin</b>
        </p>
        <button
          onClick={() => (window.location.href = '/admin')}
          style={{
            padding: 12,
            background: '#00ff66',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          IR PARA /ADMIN
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111',
        color: 'white',
        padding: 40,
      }}
    >
      <h1>🎉 APP LIBERADO!</h1>
      <h2>Você conseguiu, Bela!</h2>
      <p>Seu app está 100% sem cadeado!</p>
      <p style={{ opacity: 0.5, marginTop: 20 }}>
        Token: {token.slice(0, 25)}...
      </p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}
        style={{
          marginTop: 30,
          padding: 10,
          background: '#333',
          color: 'white',
          borderRadius: 6,
        }}
      >
        Sair
      </button>
    </div>
  );
}
