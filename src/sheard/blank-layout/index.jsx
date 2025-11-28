import { LayoutContainer } from "../layout-container";

export function BlankLayout({ children }) {
  return (
    <main style={{ padding: "3rem 4rem" }}>
      <LayoutContainer withFooter={false} withNavbar={false}>
        {children}
      </LayoutContainer>
    </main>
  );
}
