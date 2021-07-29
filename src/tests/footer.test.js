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
  expect(container.textContent).toContain("GitHub");
  expect(container.textContent).toContain("HumbleHominid");
  expect(container.textContent).toContain("LinkedIn");
  expect(container.textContent).toContain("Michael Fryer");
  expect(container.textContent).toContain("Resume");
  expect(container.textContent).toContain("Download");
});

it("Links are correct", () => {
  act(() => {
    render(<Footer/>, container);
  });

  // GitHub
  let gitHubLink = document.getElementById("gitHubLink");
  expect(gitHubLink.href).toBe("https://github.com/HumbleHominid");

  // LinkedIn
  let linkedInLink = document.getElementById("linkedInLink");
  expect(linkedInLink.href).toBe("https://www.linkedin.com/in/michael-fryer-bb017013a/");

  // Resume - TODO: This should be updated when I figure out what I'm doing here... fine for now
  let resumeLink = document.getElementById("resumeLink");
  expect(resumeLink.href).toBe("http://localhost/resume")
});