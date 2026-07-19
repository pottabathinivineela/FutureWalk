export default function MentorChat() {
  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
  style={{
    background: "#1e293b",
    padding: "15px",
    borderRadius: "12px",
    width: "fit-content",
    maxWidth: "70%",
  }}
>
  👋 Hello Vineela!

  <br />
  <br />

  I'm Nova.

  <br />

  Ask me anything about careers,
  AI, coding,
  internships,
  resumes,
  startups,
  or hackathons.
</div>
<div
  style={{
    padding: "20px",
    borderTop: "1px solid #374151",
    display: "flex",
    gap: "10px",
  }}
>
  <input
  placeholder="Ask Nova anything..."
  style={{
    flex: 1,
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  }}
/>
<button
  style={{
    background: "#7c3aed",
    color: "white",
    border: "none",
    padding: "15px 25px",
    borderRadius: "10px",
    cursor: "pointer",
  }}
>
  Send
</button>
</div>
    </div>
  );
}