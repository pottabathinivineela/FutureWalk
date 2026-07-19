type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function ChatInput({
  value,
  onChange,
  onSend,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: 20,
        borderTop: "1px solid #2a2a2a",
      }}
    >
      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter")
            onSend();
        }}
        placeholder="Ask Nova anything..."
        style={{
          flex: 1,
          padding: 15,
          borderRadius: 10,
          border: "none",
          outline: "none",
        }}
      />

      <button
        onClick={onSend}
        style={{
          background: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: 10,
          padding: "0 25px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}