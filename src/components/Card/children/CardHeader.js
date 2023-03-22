/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@carbon/react";
import { Edit, Save } from "@carbon/react/icons";
import cx from "classnames";

const CardHeaderActions = ({
  cancelDisabled,
  external,
  internal,
  onCancelClick,
  onCancelButtonClick,
  onSaveButtonClick,
  saveDisabled,
  saveText,
  cancelText,
}) => {
  if ((internal || external) && onCancelClick) {
    return (
      <>
        <Button
          kind="ghost"
          className="pal--card__header-button"
          disabled={cancelDisabled}
          onClick={onCancelButtonClick}
        >
          {cancelText}
        </Button>
        <Button
          kind="ghost"
          className="pal--card__header-button pal--card__header-button--save"
          disabled={saveDisabled}
          onClick={onSaveButtonClick}
        >
          {saveText}
          <Save className="cds--btn__icon" />
        </Button>
      </>
    );
  }

  return (
    <Button
      kind="ghost"
      className="pal--card__header-button"
      disabled={saveDisabled}
      onClick={onSaveButtonClick}
    >
      {saveText}
      <Save className="cds--btn__icon" />
    </Button>
  );
};

const CardHeader = ({
  children,
  cancelDisabled,
  className,
  editText,
  editing,
  editDisabled,
  locale,
  onCancelClick,
  onEditClick,
  onSaveClick,
  saveText,
  saveDisabled,
  small,
  subtitle,
  subtitleComponent: SubtitleComponent,
  title,
  titleComponent: TitleComponent,
  link,
  linkElement: LinkElement,
  linkProp,
  linkProps,
  linkText,
  linkIcon,
  ...rest
}) => {
  const [internalEditing, setInternalEditing] = useState(false);
  // Whether or not to rely on external or internal state for editing
  const external = onSaveClick && typeof editing === "boolean";
  const internal = onEditClick && onSaveClick && typeof editing !== "boolean";
  const isEditing = external ? editing : internalEditing;
  // Whether the edit or save buttons should be displayed
  const showButtons = isEditing || internal || (external && !children);

  const onEditButtonClick = (event) => {
    // If editing is not provided, use internal state
    if (internal && !internalEditing) {
      onEditClick(event);
      setInternalEditing(!internalEditing);
    }

    // If editing is provided, use external state
    if (external && !editing && onEditClick) {
      onEditClick(event);
    }
  };

  const onSaveButtonClick = (event) => {
    if (internal && internalEditing) {
      onSaveClick(event);
      setInternalEditing(!internalEditing);
      return;
    }

    if (external && editing) {
      onSaveClick(event);
    }
  };

  const onCancelButtonClick = (event) => {
    if (internal && internalEditing) {
      onCancelClick(event);
      setInternalEditing(!internalEditing);
    }

    if (external && editing) {
      onCancelClick(event);
    }
  };

  const renderedSubtitle = (
    <SubtitleComponent className="pal--card__subtitle">
      {subtitle}
    </SubtitleComponent>
  );

  const linkAttributes = linkProps || (link && { [linkProp]: link });

  return (
    <div
      className={cx(
        {
          "pal--card__header": true,
          "pal--card__header--editable": onSaveClick,
          "pal--card__header--editing": editing || internalEditing,
          "pal--card__header--small": small,
          "pal--card__header--double": !small && subtitle,
        },
        className
      )}
      {...rest}
    >
      <div>
        {!small && subtitle && renderedSubtitle}
        <TitleComponent className="pal--card__title">{title}</TitleComponent>
        {small && subtitle && renderedSubtitle}
      </div>
      <div>
        {showButtons ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {isEditing ? (
              <CardHeaderActions
                cancelDisabled={cancelDisabled}
                external={external}
                internal={internal}
                locale={locale}
                onCancelClick={onCancelClick}
                onCancelButtonClick={onCancelButtonClick}
                onSaveButtonClick={onSaveButtonClick}
                saveDisabled={saveDisabled}
                saveText={saveText}
              />
            ) : (
              <Button
                kind="ghost"
                className="pal--card__header-button pal--card__header-button--edit"
                onClick={onEditButtonClick}
                disabled={editDisabled}
              >
                {editText}
                <Edit className="cds--btn__icon" />
              </Button>
            )}
          </>
        ) : (
          children
        )}
        {linkAttributes && (
          <LinkElement {...linkAttributes}>
            {linkIcon ? (
              <>
                <span className="link-with-icon">{linkText}</span>
                {linkIcon}
              </>
            ) : (
              linkText || "Icon"
            )}
          </LinkElement>
        )}
      </div>
    </div>
  );
};

CardHeader.propTypes = {
  /**
   * Any children of the CardHeader. Actionable items should be passed into the header as children,
   * as the component or element will be rendered on the right hand side of the header.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /**
   * Whether the cancel button is disabled.
   */
  cancelDisabled: PropTypes.bool,
  /**
   * Class name(s) to apply to the CardHeader component's root element.
   */
  className: PropTypes.string,
  /**
   * Alternative edit text to be rendered inside of the edit button.
   */
  editText: PropTypes.string,
  /**
   * If editing is set to true then the component will display the blue header and the save button.
   * This can be useful if the mechanism  to edit the card is located in an overflow menu rendered as a child of the CardHeader or triggering an edit mode needs to take
   * place outside of the CardHeader component.
   */
  editing: PropTypes.bool,
  /**
   * Whether the edit button is currently disabled.
   */
  editDisabled: PropTypes.bool,
  /**
   * The locale used for translating the strings.
   */
  locale: PropTypes.string,
  /**
   * An event handler to fire off when clicking the cancel button. The cancel button will only be
   * rendered if the user clicks the edit button or editing is set to true.
   */
  onCancelClick: PropTypes.func,
  /**
   * An event handler to fire off when clicking on the edit button. The edit button will only be
   * rendered if a onSaveClick is also provided to the CardHeader component.
   */
  onEditClick: PropTypes.func,
  /**
   * An event handler to fire off when clicking the save button. The save button will only be
   * rendered if the user clicks the edit button or editing is set to true.
   */
  onSaveClick: PropTypes.func,
  /**
   * Whether the save button is currently disabled.
   */
  saveDisabled: PropTypes.bool,
  /**
   * Alternative save text to be rendered inside of the save button.
   */
  saveText: PropTypes.string,
  /**
   * Whether or not to use the small header.
   */
  small: PropTypes.bool,
  /**
   * The element or component to render for the subtitle.
   */
  subtitle: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * The element or component to render for the subtitle.
   */
  subtitleComponent: PropTypes.elementType,
  /**
   * The title to be used for the Card component.
   */
  title: PropTypes.node.isRequired,
  /**
   * A component or element to be wrapped around the title. This is useful if you need to control
   * what heading element to represent the Card.
   */
  titleComponent: PropTypes.elementType,
  /**
   * A url to this card can link to for the user to get more information.
   */
  link: PropTypes.string,
  /**
   * Define what linkElement is used, default is an anchor tag, but if you need react router you can provide a Link element
   */
  linkElement: PropTypes.elementType,
  /**
   * Prop that the link should use. Defaults to href for anchor tags, but if you are using react router you can set this to 'to'
   */
  linkProp: PropTypes.string,
  /**
   * The text of the link
   */
  linkText: PropTypes.string,
  /**
   * The Icon to use next to the link
   */
  linkIcon: PropTypes.element,
  /**
   * Additional props for the link element
   */
  linkProps: PropTypes.any,
};

CardHeader.defaultProps = {
  children: null,
  cancelDisabled: false,
  className: "",
  editDisabled: false,
  editText: "",
  editing: undefined,
  onCancelClick: null,
  onEditClick: null,
  onSaveClick: null,
  saveDisabled: false,
  cancelText: "",
  saveText: "",
  small: false,
  subtitle: "",
  subtitleComponent: "h4",
  titleComponent: "h3",
  link: null,
  linkElement: "a",
  linkProp: "href",
};

export default CardHeader;
