import React, { useEffect, useState } from 'react';
import axios from 'axios';
// 수정 전: import { Diff2Html } from 'diff2html';
// 수정 후:
import { html as diff2htmlHtml } from 'diff2html'; // 'html' 함수를 'diff2htmlHtml'로 이름 변경하여 임포트
import 'diff2html/bundles/css/diff2html.min.css';
import ReactMarkdown from 'react-markdown';

function App() {
  const [reviews, setReviews] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

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

  const renderDiffHtml = (diffText) => {
    if (!diffText) {
      return { __html: '<p>Diff 내용이 없습니다.</p>' };
    }
    // 수정 전: const diffHtml = Diff2Html.getHtml(diffText, { ... });
    // 수정 후:
    const diffHtml = diff2htmlHtml(diffText, { // 임포트한 'diff2htmlHtml' 함수 사용
      outputFormat: 'side-by-side',
      drawFileList: true,
      matching: 'lines',
      renderNothingWhenEmpty: true,
    });
    return { __html: diffHtml };
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
                    <div dangerouslySetInnerHTML={renderDiffHtml(review.diff)}></div>
                  ) : (
                    <pre style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      background: '#f7f7f7',
                      padding: '10px',
                      maxWidth: '100%',
                    }}>
                      {review.diff ? review.diff.split('\n')[0] : 'Diff 내용 없음'}
                    </pre>
                  )}
                </div>

                <strong>리뷰 내용:</strong>
                <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px' }}>
                  <ReactMarkdown>{review.review}</ReactMarkdown>
                </div>
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