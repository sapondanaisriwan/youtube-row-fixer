import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import ExtensionSetting from './ExtensionSetting';
import Logo from '../icon/logo';


function Header() {
  return (

    <Navbar className="dark:bg-content2">
      <NavbarBrand className="gap-2">
        <a href="https://github.com/sapondanaisriwan/youtube-row-fixer" target='_blank' className="flex items-center gap-2">
          <h4>
            <Logo />
          </h4>
          <p className="select-none text-lg font-semibold">Row Fixer</p>
        </a>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ExtensionSetting />
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
