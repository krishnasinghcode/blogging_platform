import React from 'react';

const ThemeSwitcher = () => {
  const themes = [
    'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate',
    'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween',
    'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy',
    'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn',
    'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'
  ];

  const handleThemeChange = (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
    localStorage.setItem('theme', e.target.value);
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-sm m-1">Theme</label>
      <div tabIndex={0} className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <select
          className="select select-bordered w-full"
          onChange={handleThemeChange}
          defaultValue={localStorage.getItem('theme') || 'light'}
        >
          {themes.map((theme) => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
