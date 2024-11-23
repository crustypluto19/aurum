import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { themeChange } from "theme-change";

const localStorageAtom = (key: string, initialValue: string) => {
  const baseAtom = atom(localStorage.getItem(key) || initialValue);

  baseAtom.onMount = (setAtom) => {
    const callback = () => {
      setAtom(localStorage.getItem(key) || initialValue);
    };
    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener("storage", callback);
    };
  };

  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: string) => {
      set(baseAtom, update);
      localStorage.setItem(key, update);
    }
  );

  return derivedAtom;
};

const themeAtom = localStorageAtom("theme", "cupcake");

const ThemeSwitcher = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    themeChange(false);
  }, []);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <select data-choose-theme value={theme} onChange={handleThemeChange}>
      <option value="cupcake">Light</option>
      <option value="sunset">Dark</option>
    </select>
  );
};

export default ThemeSwitcher;
