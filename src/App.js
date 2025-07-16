import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]); // 토글 상태 추적용

  useEffect(() => {
    axios.get('/api/reviews')
      .then(response => setReviews(response.data))
      .catch(error => console.error(error));
  }, []);

  const toggleDiff = (id) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gemini AI 코드 리뷰 히스토리 😍</h2>
      {reviews.length === 0 ? (
        <p>리뷰가 없습니다.</p>
      ) : (
        <ul>
          {reviews.map(review => {
            const isExpanded = expandedIds.includes(review.id);
            return (
              <li key={review.id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <strong>PR 번호:</strong> {review.prNumber} <br />

                <strong onClick={() => toggleDiff(review.id)} style={{ cursor: 'pointer', color: '#007bff' }}>
                  📄 Diff 내용 {isExpanded ? '▲' : '▼'}
                </strong>
                <div style={{ marginTop: '0.5rem' }}>
                  {isExpanded ? (
                    <pre style={{ whiteSpace: 'pre-wrap', background: '#f7f7f7', padding: '10px' }}>{review.diff}</pre>
                  ) : (
                    <pre style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      background: '#f7f7f7',
                      padding: '10px',
                      maxWidth: '100%',
                    }}>
                      {review.diff.split('\n')[0]}  
                    </pre>
                  )}
                </div>

                <strong>리뷰 내용:</strong>
                <pre style={{ whiteSpace: 'pre-wrap', background: '#eef', padding: '10px' }}>{review.review}</pre>
                <small>작성일: {new Date(review.createdAt).toLocaleString()}</small>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
