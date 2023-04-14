import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

// Components
import Message from "../Message";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  // Catch the error to prevent the js from crashing
  static getDerivedStateFromError() {
    // Set error to true and show generic message
    return { error: true };
  }

  render() {
    const { children, text, caption, t } = this.props;
    const { error, errorId } = this.state;

    let formattedCaption = caption || t("contactSupport");

    // If error show a generic error message
    if (error) {
      return (
        <Message
          id="generic-error-message"
          icon="ERROR"
          caption={formattedCaption}
          text={text || t("genericError")}
          isTileWrapped
        />
      );
    }

    // If no error return children
    return children;
  }
}

ErrorBoundary.propTypes = {
  // locale: PropTypes.string, // If using translated strings include the locale prop
  /* Any props that the user can pass into this pattern */
  children: PropTypes.node.isRequired,
  /**
   * If provided, error information will be POSTed to the given endpoint for logging purposes. This includes a generated ID (which is also displayed to the user), and the error name, message, and stack.
   */
  // loggingEndpoint: PropTypes.string,
  /**
   * Override the text to show in the Message component.
   */
  text: PropTypes.string,
  /**
   * Override the caption to show in the Message component. If loggingEndpoint is provided the error ID will be appended below this.
   */
  caption: PropTypes.string,
  /**
   * propagated translation function
   */
  t: PropTypes.func
};

ErrorBoundary.defaultProps = {
  text: undefined,
  caption: undefined,
};

export default withTranslation("ErrorBoundary")(ErrorBoundary);
