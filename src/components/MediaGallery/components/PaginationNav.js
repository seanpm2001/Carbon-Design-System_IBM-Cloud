import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

/**
 * A pagination component that can be used to select a numerical value that corresponds to a visible item on the page
 * or the page the user is viewing itself.
 */
class PaginationNav extends Component {
  static propTypes = {
    /**
     * Any other class names to be provided to the pagination nav component.
     */
    className: PropTypes.string,
    /**
     * What the selected number should be.
     */
    currentSelected: PropTypes.number.isRequired,
    /**
     * The locale used for translating the strings.
     */
    // locale: PropTypes.string,
    /**
     * The label to use for the next button.
     */
    nextLabel: PropTypes.string.isRequired,
    /**
     * The number of menu items to display.
     */
    numItems: PropTypes.number.isRequired,
    /**
     * A function to fire off upon selecting an image.
     */
    onSelect: PropTypes.func.isRequired,
    /**
     * A label to provided to the an option to select.
     */
    optionLabel: PropTypes.string.isRequired,
    /**
     * The label to provide to the previous button.
     */
    previousLabel: PropTypes.string.isRequired,
    /**
     * The label to provide to the select element if more than five items are provided.
     */
    selectLabel: PropTypes.string.isRequired,
    /**
     * The maximum number of items to show on the visible list.
     */
    visibleListMax: PropTypes.number,
  };

  static defaultProps = {
    visibleListMax: 5,
    className: "",
    // locale: documentLanguage,
  };

  static getDerivedStateFromProps(nextProps, currentState) {
    const { selected } = currentState;
    const { currentSelected } = nextProps;
    if (currentSelected !== selected) {
      return {
        ...currentState,
        selected: currentSelected,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { currentSelected, numItems, visibleListMax } = props;

    if (props.currentSelected > props.numItems || props.currentSelected < 1) {
      this.warnDefaultSelected(currentSelected, numItems);
    }

    if (this.isInvalidNumber(numItems)) {
      this.warnInvalidNumber("numItems", numItems);
    }

    if (this.isInvalidNumber(currentSelected)) {
      this.warnInvalidNumber("currentSelected", currentSelected);
    }

    if (this.isInvalidNumber(visibleListMax)) {
      this.warnInvalidNumber("visibleListMax", visibleListMax);
    }

    this.state = { selected: props.currentSelected };
  }

  componentDidUpdate() {
    const { numItems } = this.props;
    const { selected } = this.state;
    // If the selected value is out of range of the new number of items, just set it to the last item.
    if (selected > numItems) {
      this.setSelected(numItems);
    }
  }

  isInvalidNumber = (num) => {
    return num < 1 || num % 1 !== 0 || Number.isNaN(num);
  };

  warnInvalidNumber = (param, value) => {
    console.warn(
      `PaginationNav: The value provided for ${param} of ${value} is invalid. You must use an integer greater than zero.`
    );
  };

  /**
   * Warns a user when the default selected value is out of range of the number of items.
   */
  warnDefaultSelected = (currentSelected, numItems) => {
    console.warn(
      `PaginationNav: The value provided for currentSelected of ${currentSelected} is out of range. Use a number between 1 and ${numItems}.`
    );
  };

  /**
   * Sets the selected value and fires of the onSelect event.
   */
  setSelected = (value) => {
    const { onSelect } = this.props;
    const selected = Number(value);
    this.setState({ selected });
    onSelect({
      value: selected,
      index: selected - 1,
    });
  };

  /**
   * Event handler for a list item button.
   */
  onListItemButtonClick = (e) => {
    const { page } = e.currentTarget.dataset;
    this.setSelected(page);
  };

  /**
   * Event handler for the select drop down.
   */
  onSelectChange = (e) => {
    const { value } = e.target;
    this.setSelected(value);
  };

  /**
   * Renders a list item button.
   */
  renderListItemButton = (value) => {
    const { selected } = this.state;
    const { optionLabel } = this.props;
    const isSelected = value === selected;
    const activeClass = isSelected ? " cds--pagination-nav__page--active" : "";
    return (
      <li className="cds--pagination-nav__list-item" key={`page-${value}`}>
        <button
          className={`cds--pagination-nav__page${activeClass}`}
          aria-current={isSelected ? "step" : null}
          disabled={isSelected}
          data-page={value}
          onClick={this.onListItemButtonClick}
          title={`${optionLabel} ${value}`}
          type="button"
        >
          <span className="cds--pagination-nav__accessibility-label">{`${optionLabel} `}</span>
          {value}
        </button>
      </li>
    );
  };

  /**
   * Renders the set of list item buttons used for changing the selected item.
   */
  renderInitialListItemButtons = () => {
    const { visibleListMax, numItems } = this.props;
    const finish =
      visibleListMax < numItems ? visibleListMax - 1 : numItems - 1;
    const listItems = [];

    for (let index = 1; index <= finish; index += 1) {
      listItems.push(this.renderListItemButton(index));
    }
    return listItems;
  };

  /**
   * Renders the option elements for the select drop down.
   */
  renderSelectOption = (value, isHidden) => (
    <option value={value} hidden={isHidden} key={`page-${value}`}>
      {value}
    </option>
  );

  /**
   * Renders the list of options for the select drop down.
   */
  renderSelectOptions = () => {
    const { visibleListMax, numItems } = this.props;
    const start = visibleListMax;
    const finish = numItems - 1;
    const options = [];

    for (let index = start; index <= finish; index += 1) {
      options.push(this.renderSelectOption(index, false));
    }

    return options;
  };

  render() {
    const { selected } = this.state;
    const {
      className,
      currentSelected,
      // locale,
      nextLabel,
      numItems,
      optionLabel,
      previousLabel,
      selectLabel,
      visibleListMax,
      t,
      ...other
    } = this.props;
    // const defaultLocale = getLocale(locale);
    // const translations = getTranslations(translationStrings, defaultLocale);
    const leftDisabled = selected === 1;
    const rightDisabled = selected === numItems;
    const renderSelect = numItems > visibleListMax;
    const valueIsSelectOption =
      selected >= visibleListMax && selected < numItems;
    // Any conditional classes we may need to apply.
    const leftDisabledClass = leftDisabled
      ? " cds--pagination-nav__page--disabled"
      : "";
    const rightDisabledClass = rightDisabled
      ? " cds--pagination-nav__page--disabled"
      : "";
    const selectActiveClass = valueIsSelectOption
      ? " cds--pagination-nav__page--active"
      : "";
    // We need to remove the text indent here when we get to double digits to avoid overflow.
    const removeTextIndent =
      valueIsSelectOption && selected > 9 ? " remove-text-indent" : "";
    const navClasses = className ? ` ${className}` : "";

    return (
      <nav
        className={`cds--pagination-nav${navClasses}`}
        aria-label={t("pageNavigation")}
        {...other}
      >
        <ul className="cds--pagination-nav__list">
          <li className="cds--pagination-nav__list-item">
            <button
              className={`cds--pagination-nav__page cds--pagination-nav__page--direction${leftDisabledClass}`}
              onClick={this.onListItemButtonClick}
              data-page={leftDisabled ? null : selected - 1}
              disabled={leftDisabled}
              title={previousLabel}
              type="button"
            >
              <span className="cds--pagination-nav__accessibility-label">
                {previousLabel}
              </span>
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                className="cds--pagination-nav__icon"
                width="5"
                height="8"
                viewBox="0 0 5 8"
                aria-hidden="true"
              >
                <path d="M5 8L0 4l5-4z" />
              </svg>
            </button>
          </li>
          {this.renderInitialListItemButtons()}
          {renderSelect && (
            <li className="cds--pagination-nav__list-item">
              <div className="cds--pagination-nav__select">
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                  className={`cds--pagination-nav__page cds--pagination-nav__page--select${selectActiveClass}${removeTextIndent}`}
                  aria-label={selectLabel}
                  onChange={this.onSelectChange}
                  value={valueIsSelectOption ? selected : " "}
                  title={selectLabel}
                >
                  {this.renderSelectOption(" ", true)}
                  {this.renderSelectOptions()}
                </select>
                <div className="cds--pagination-nav__select-icon-wrapper">
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cds--pagination-nav__select-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <circle cx="3" cy="8" r="1"></circle>
                    <circle cx="8" cy="8" r="1"></circle>
                    <circle cx="13" cy="8" r="1"></circle>
                  </svg>
                </div>
              </div>
            </li>
          )}
          {this.renderListItemButton(numItems)}
          <li className="cds--pagination-nav__list-item">
            <button
              className={`cds--pagination-nav__page cds--pagination-nav__page--direction${rightDisabledClass}`}
              data-page={rightDisabled ? null : selected + 1}
              onClick={this.onListItemButtonClick}
              disabled={rightDisabled}
              title={nextLabel}
              type="button"
            >
              <span className="cds--pagination-nav__accessibility-label">
                {nextLabel}
              </span>
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                className="cds--pagination-nav__icon"
                width="5"
                height="8"
                viewBox="0 0 5 8"
                aria-hidden="true"
              >
                <path d="M0 0l5 4-5 4z" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withTranslation("MediaGallery")(PaginationNav);
