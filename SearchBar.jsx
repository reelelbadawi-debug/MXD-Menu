export default function SearchBar({ value, onChange }) {
  return (
    <div className="mxd-search">
      <input
        type="text"
        placeholder="دور على صنف..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
