import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Components
import Message from "../Message";

// Pal analytics
// import trackComponentEvent from '../../utils/analytics';

// // Translations
// import translationStrings from './translations';
// import getLocale from '../../utils/getLocale';
// import translationUtils from '../../utils/translate';

// Utilities
// import requestUtils from "../../utils/request";

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

  // componentDidCatch(error, errorInfo) {
  //   const { loggingEndpoint } = this.props;
  //   const errorId = new Date().toISOString().replace(/[-:.]/g, '');
  //   this.setState({ errorId });
  //
  //   // You can also log the error to an error reporting service
  //   trackComponentEvent('Error Boundary triggered', {
  //     palComponent: 'Component - Error Boundary',
  //     error,
  //     errorInfo,
  //   });
  //   if (loggingEndpoint) {
  //     requestUtils.post(loggingEndpoint, {
  //       body: {
  //         id: errorId,
  //         error,
  //         errorInfo,
  //         name: error.name,
  //         message: error.message,
  //         stack: error.stack,
  //         userAgent: typeof navigator !== 'undefined' && navigator.userAgent,
  //       },
  //     });
  //   }
  // }

  render() {
    const {
      // locale,
      children,
      text,
      caption,
      // loggingEndpoint,
    } = this.props;
    const { error, errorId } = this.state;

    // const defaultLocale = getLocale(locale);
    // const translate = translationUtils.getTranslateFunction(
    //   translationStrings,
    //   defaultLocale,
    // );

    let formattedCaption = caption;

    // If error show a generic error message
    if (error) {
      return (
        <Message
          id="generic-error-message"
          icon="ERROR"
          caption={formattedCaption}
          text={text}
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
};

ErrorBoundary.defaultProps = {
  // locale:
  //   (typeof document !== "undefined" &&
  //     !!document &&
  //     !!document.documentElement &&
  //     document.documentElement.lang) ||
  //   "en",
  // loggingEndpoint: undefined,
  text: undefined,
  caption: undefined,
};

export default ErrorBoundary;
