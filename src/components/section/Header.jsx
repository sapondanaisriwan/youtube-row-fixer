import { Navbar, NavbarBrand, NavbarContent, Button } from "@nextui-org/react";
import ExtensionSetting from "./ExtensionSetting";
import Logo from "../icon/logo";

function Header() {
  return (
    <Navbar className="dark:bg-content2">
      <NavbarBrand className="gap-2">
        <a
          href="https://github.com/sapondanaisriwan/youtube-row-fixer"
          target="_blank"
          className="flex items-center gap-2"
        >
          <h4>
            <Logo />
          </h4>
          <p className="select-none text-lg font-semibold">Row Fixer</p>
        </a>
      </NavbarBrand>
      <NavbarContent justify="end">
        <a
          href="https://ko-fi.com/sapondanaisriwan"
          target="_blank"
        >
          <Button size="sm" startContent={<HeartIcon />} aria-label="Like" variant="bordered" radius="full">
            <p className="select-none">Donate</p>
          </Button>
        </a>
        <ExtensionSetting />
      </NavbarContent>
    </Navbar>
  );
}

export const HeartIcon = ({ fill = "currentColor", filled, size, height, width, ...props }) => {
  return (
    <svg
      fill={filled ? fill : "none"}
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default Header;
