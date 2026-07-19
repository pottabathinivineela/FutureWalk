type Props = {
  onSelect: (text: string) => void;
};

const suggestions = [
  "Become AI Engineer",
  "Resume Review",
  "Interview Tips",
  "Find Hackathons",
  "Scholarships",
];

export default function SuggestionChips({
  onSelect,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        marginBottom: 20,
      }}
    >
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          style={{
            background: "#1f2937",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: 20,
            cursor: "pointer",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}