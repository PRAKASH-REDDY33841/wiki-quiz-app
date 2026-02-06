import { useState, useEffect } from "react";

const API_BASE = "https://wiki-quiz-backend-h2q8.onrender.com";// change if needed

function App() {
  console.log("APP COMPONENT LOADED");

  const [url, setUrl] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [history, setHistory] = useState([]);
  const [tab, setTab] = useState("generate");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= GENERATE QUIZ =================

  const generateQuiz = async () => {
    if (!url.trim()) {
      alert("Please paste Wikipedia URL");
      return;
    }

    try {
      setLoading(true);
      console.log("Generating quiz for:", url);

      const res = await fetch(`${API_BASE}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      console.log("Status:", res.status);

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      console.log("Response:", data);

      setQuizData(data);
      loadHistory();

    } catch (err) {
      console.error("Generate failed:", err);
      alert("Generate failed — check console");
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD HISTORY =================

  const loadHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/quizzes`);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("History load failed", err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // ================= UI =================

  return (
    <div style={{
      padding: 30,
      fontFamily: "Arial",
      maxWidth: 950,
      margin: "auto"
    }}>

      <h1>📘 Wiki Quiz App</h1>

      {/* ===== Tabs ===== */}

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab("generate")}>
          Generate Quiz
        </button>

        <button onClick={() => setTab("history")}>
          Past Quizzes
        </button>
      </div>

      {/* ================= TAB 1 ================= */}

      {tab === "generate" && (
        <div style={{
          border: "2px solid #ddd",
          padding: 20,
          background: "#f9f9f9",
          borderRadius: 8
        }}>

          <h3>Generate Quiz</h3>

          <input
            type="text"
            placeholder="Paste Wikipedia URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: "100%",
              padding: 14,
              fontSize: 16,
              border: "2px solid #333",
              borderRadius: 6
            }}
          />

          <br /><br />

          <button
            type="button"
            onClick={generateQuiz}
            disabled={loading}
            style={{
              padding: "10px 18px",
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>

          {/* ===== RESULT ===== */}

          {quizData && quizData.quiz && (
            <div style={{ marginTop: 25 }}>
              <h2>{quizData.title}</h2>

              {quizData.quiz.map((q, i) => (
                <div key={i} style={{
                  border: "1px solid #ccc",
                  padding: 15,
                  marginTop: 12,
                  borderRadius: 8,
                  background: "#ffffff"
                }}>
                  <h4>{i + 1}. {q.question}</h4>

                  {q.options?.map((opt, j) => (
                    <div key={j}>• {opt}</div>
                  ))}

                  <p><b>Answer:</b> {q.answer}</p>
                  <p>{q.explanation}</p>
                  <small>Difficulty: {q.difficulty}</small>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ================= TAB 2 ================= */}

      {tab === "history" && (
        <div>
          <h3>Past Quizzes</h3>

          <table border="1" cellPadding="10" width="100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>URL</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {history.map((h) => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.title}</td>
                  <td style={{ fontSize: 12 }}>{h.url}</td>

                  <td>
                    <button onClick={() => {
                      try {
                        const parsed = JSON.parse(h.quiz_json);
                        setSelected({
                          title: h.title,
                          quiz: parsed.quiz
                        });
                      } catch {
                        alert("Quiz parse failed");
                      }
                    }}>
                      View
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MODAL ================= */}

      {selected && (
        <div style={{
          position: "fixed",
          top: 40,
          left: "10%",
          width: "80%",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "white",
          padding: 25,
          border: "3px solid black",
          borderRadius: 10
        }}>

          <h2>{selected.title}</h2>

          {selected.quiz?.map((q, i) => (
            <div key={i} style={{
              border: "1px solid #ccc",
              padding: 12,
              marginTop: 10,
              borderRadius: 6
            }}>
              <h4>{i + 1}. {q.question}</h4>
              <p><b>Answer:</b> {q.answer}</p>
              <p>{q.explanation}</p>
            </div>
          ))}

          <button onClick={() => setSelected(null)}>
            Close
          </button>
        </div>
      )}

    </div>
  );
}

export default App;
