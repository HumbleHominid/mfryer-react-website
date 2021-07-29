import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Footer from '../components/footer';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("It Renders", () => {
  act(() => {
    render(<Footer/>, container);
  });

  expect(container.textContent).toContain("Email");
  expect(container.textContent).toContain("michael.d.fryer@gmail.com");
});