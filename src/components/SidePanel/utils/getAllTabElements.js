/**
 * Gets all elements that can be tabbed to within a provided element.
 */
const getAllTabElements = element => {
  const tabs = [
    'a[href]:not([tabindex="-1"])',
    'area[href]:not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'iframe:not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
    '[contentEditable=true]:not([tabindex="-1"])',
  ];

  return element.querySelectorAll(tabs.join(', '));
};

export default getAllTabElements;
