import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [type, setType] = useState('post');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, tone, type }),
      });
      const data = await res.json();
      setResult(data.result || data.error);
    } catch (err) {
      setResult('Error connecting to backend.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 10px #0001' }}>
      <h2>LinkedIn AI Content Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Prompt:<br/>
            <textarea
              rows={4}
              style={{ width: '100%' }}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>
            Tone:&nbsp;
            <select value={tone} onChange={e => setTone(e.target.value)}>
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="enthusiastic">Enthusiastic</option>
              <option value="casual">Casual</option>
            </select>
          </label>
          &nbsp;&nbsp;
          <label>
            Type:&nbsp;
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="post">Post</option>
              <option value="summary">Summary</option>
              <option value="comment">Comment</option>
            </select>
          </label>
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: 16 }}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: 24 }}>
          <h3>Result:</h3>
          <div style={{ background: '#f0f0f0', padding: 16, borderRadius: 6, whiteSpace: 'pre-wrap' }}>{result}</div>
        </div>
      )}
    </div>
  );
}

export default App;