import { Footer } from "../footer";
import { Navbar } from "../navbar";
import "./style.css";

export function LayoutContainer({
  children,
  withNavbar = true,
  withFooter = true,
}) {
  return (
    <>
      {withNavbar ? <Navbar /> : null}
      <main className="app-continer">{children}</main>
      {withFooter ? <Footer /> : null}
    </>
  );
}
