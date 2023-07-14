import React from "react";
import { render } from "../../../config/jest/test-utils";
import userEvent from "@testing-library/user-event";
import { IbmCloud as IbmCloud16 } from "@carbon/react/icons";
import { act } from "react-dom/test-utils";
import WorldLevelNav from "./WorldLevelNav";

jest.mock("../../utils/debounce", () => (callback) => () => {
  callback();
});

const props = {
  title: "Cloud PAL",
  titleHref: "/ibmcloud/pal/components/world-level-nav/code",
  items: [{ href: "something", label: "some_label" }],
  icon: <IbmCloud16 />,
  linkComponent: "button",
};

const resizeWindow = (x, y) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};

/* Tests for this Component go here */
describe("WorldLevel Nav", () => {
  describe("render classes", () => {
    it("render base class", () => {
      const { container } = render(<WorldLevelNav {...props} />);
      const baseClass = container.querySelector(".cpx--world-level-nav");
      expect(baseClass).toBeInTheDocument();
    });
  });

  describe("fire resize event calling onToggle function", () => {
    it("from bigger(enzyme default window size 1024px width) to small size", async () => {
      const callback = jest.fn();
      render(<WorldLevelNav onToggle={callback} {...props} />);
      act(() => {
        resizeWindow(500, 768);
      });

      expect(callback).toHaveBeenCalled();
    });

    it("from small to bigger size", async () => {
      act(() => {
        resizeWindow(300, 768);
      });

      const callback = jest.fn();
      render(<WorldLevelNav onToggle={callback} {...props} />);
      act(() => {
        resizeWindow(1024, 768);
      });

      expect(callback).toHaveBeenCalled();
    });
  });

  describe("Changes on open prop", () => {
    it("When a user toggles the open prop to false the nav collapses", () => {
      const { container } = render(<WorldLevelNav open={false} {...props} />);
      const baseClass = container.querySelector(".cpx--side-nav--collapsed");
      expect(baseClass).toBeInTheDocument();
    });

    it("When a user toggles the open prop to true the nav opens", () => {
      const { container } = render(<WorldLevelNav {...props} />);
      const baseClass = container.querySelector(".cpx--side-nav--collapsed");
      expect(baseClass).toBe(null);
    });
  });

  describe("Changing viewport and checking if nav collapses or not", () => {
    it("When the window goes to the small viewport the nav collapses", async () => {
      const { container } = render(<WorldLevelNav {...props} />);
      act(() => {
        resizeWindow(300, 768);
      });
      const baseClass = container.querySelector(".cpx--side-nav--collapsed");
      expect(baseClass).toBeInTheDocument();
    });

    it("When the window goes to the small viewport the nav collapses", async () => {
      const { container } = render(<WorldLevelNav {...props} />);
      act(() => {
        resizeWindow(300, 768);

        resizeWindow(1024, 768);
      });
      const baseClass = container.querySelector(".cpx--side-nav--collapsed");
      expect(baseClass).toBe(null);
    });
  });
});
