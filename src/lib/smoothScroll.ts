// lib/smoothScroll.ts
export const smoothScrollTo = (elementId: string): void => {
  const element = document.getElementById(elementId);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
