import React from "react";
import { PageWrap } from "~/features/ui";
import { Header } from "~/features/ui";
import { NotFound } from "~/features/ui";
import { Footer } from "~/features/ui";

export default function PageNotFound() {
  return (
    <PageWrap
      content={
        <>
          <Header />
          <main>
            <NotFound />
          </main>
          <Footer />
        </>
      }
      // replace toon colors with cog colors
      style={{"--blue-400": "#243242", "--blue-600": "#14191f"}}
    />
  );
}
