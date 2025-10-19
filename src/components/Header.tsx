import type { ButtonHTMLAttributes, ReactNode } from "react";

const HeaderShell = ({ children }: { children: ReactNode }) => (
  <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
    {children}
  </header>
);

const HeaderContainer = ({ children }: { children: ReactNode }) => (
  <div className="max-w-7xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between">
    {children}
  </div>
);

const HeaderLogo = () => (
  <div className="text-slate-900 font-semibold tracking-tight">RS Rent Scout</div>
);

const HeaderRight = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-3 shrink-0">{children}</div>
);

const HeaderLocale = () => <span className="hidden sm:inline text-slate-700">PT-BR</span>;

type HeaderLoginButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const baseHeaderButtonClassName =
  "inline-flex h-9 px-4 items-center rounded-lg bg-teal-600 text-white hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 shadow-sm";

const HeaderLoginButton = ({ className, ...props }: HeaderLoginButtonProps) => (
  <button
    type="button"
    data-evt="header_login_click"
    {...props}
    className={className ? `${baseHeaderButtonClassName} ${className}` : baseHeaderButtonClassName}
  >
    Login
  </button>
);

export const Header = () => (
  <HeaderShell>
    <HeaderContainer>
      <HeaderLogo />
      <HeaderRight>
        <HeaderLocale />
        <HeaderLoginButton />
      </HeaderRight>
    </HeaderContainer>
  </HeaderShell>
);
