type Props = {
  sender: "user" | "nova";
  text: string;
};

export default function ChatBubble({
  sender,
  text,
}: Props) {
  const isUser = sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser
          ? "flex-end"
          : "flex-start",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          background: isUser
            ? "#7c3aed"
            : "#1f2937",

          padding: "15px",

          borderRadius: 15,

          whiteSpace: "pre-wrap",

          color: "white",
        }}
      >
        <strong>
          {isUser ? "👤 You" : "🤖 Nova"}
        </strong>

        <br />
        <br />

        {text}
      </div>
    </div>
  );
}