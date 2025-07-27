import React from 'react';

const ThemeSwitcher = () => {
  const themes = ['wireframe', 'dark','luxury','cupcake'];

  const handleThemeChange = (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
    localStorage.setItem('theme', e.target.value);
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  return (
    <select className="select select-sm" onChange={handleThemeChange} defaultValue={localStorage.getItem('theme') || 'light'}>
      {themes.map((theme) => (
        <option key={theme} value={theme}>{theme}</option>
      ))}
    </select>
  );
};

export default ThemeSwitcher;
