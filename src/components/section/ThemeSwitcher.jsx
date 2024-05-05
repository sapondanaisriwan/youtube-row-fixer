import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { KeyExtensionTheme } from "../../data/storage-key";
import SwitchControl from "../ui/SwitchControl";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <SwitchControl
      label="Dark Mode"
      color="success"
      storageKey={KeyExtensionTheme}
      onChange={handleChange}
      thumbIconOn={
        <span>
          <RiMoonFill />
        </span>
      }
      thumbIconOff={
        <span>
          <RiSunFill className="text-yellow-500" />
        </span>
      }
    />
  );
}
