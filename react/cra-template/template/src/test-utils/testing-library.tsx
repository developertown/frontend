import { render, RenderOptions as RtlRenderOptions, RenderResult as RtlRenderResult } from "@testing-library/react";
import { createMemoryHistory, History } from "history";
import React from "react";
import { Router } from "react-router-dom";

type ProvidersProps = {
  route?: string;
  history?: History;
};

type RenderOptions = RtlRenderOptions & ProvidersProps;

type RenderResult = RtlRenderResult & {
  history: History;
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "queries">): RenderResult => {
  const Providers: React.FC<ProvidersProps> = ({
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    children,
  }) => {
    return <Router history={history}>{children}</Router>;
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return render(ui, { wrapper: Providers, ...options });
};

// re-export everything
export * from "@testing-library/react";
export * from "jest-axe";
// override render method
export { customRender as render };
