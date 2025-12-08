export default function ThemeToggle({ isDark, onChange }) {
  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={isDark}
        onChange={(e) => onChange(e.target.checked)}
      />
      Sötét mód
      {isDark ? 'Dark mode ' : ' Light mode'}
    </label>
  );
}