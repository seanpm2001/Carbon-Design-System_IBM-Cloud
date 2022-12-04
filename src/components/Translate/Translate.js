import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Carbon Components
import { Link } from "@carbon/react";

const tagsRegex = /<(a|span|code)>([^<]+)<\/[^>]+>/g;
const splitRegex = /<[^>]+>[^<]+<\/[^>]+>/;

const renderElement = (el, tagProps, map) => {
  const type = el[1];
  const content = el[2];
  let element;
  if (map[type]) {
    const Component = map[type];
    return <Component {...tagProps}>{content}</Component>;
  }
  if (type === "a") return <Link {...tagProps}>{content}</Link>;
  if (type === "span") return <span {...tagProps}>{content}</span>;
  if (type === "code") return <code {...tagProps}>{content}</code>;
  return element;
};

const Translate = ({ tagProps, tagMap, children }) => {
  const parts = children.split(splitRegex);
  const elements = [];
  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = tagsRegex.exec(children)) !== null) {
    elements.push(match);
  }
  const content = parts.map((text, i) => {
    const el = elements[i];
    const p = tagProps[i] || {};
    if (el)
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={i}>
          {text}
          {renderElement(el, p, tagMap)}
        </Fragment>
      );
    return text;
  });
  return <span className="pal--translate">{content}</span>;
};

Translate.propTypes = {
  /**
   * The string from the translation bundle, with tags embedded.
   */
  children: PropTypes.string.isRequired,
  /**
   * Array of properties for each element / component created. The array index corresponds to the index
   * of each tag in the string.
   */
  tagProps: PropTypes.arrayOf(PropTypes.object),
  /**
   * Each tag has a default HTML element or component that it maps to, but you can use this to override
   * the mapping and use a different React component. For example, to render a react-router Link instead
   * of a carbon Link, map the `a` tag to the `Link` component (tagMap={{ a: Link }}).
   */
  tagMap: PropTypes.shape({
    a: PropTypes.elementType,
    span: PropTypes.elementType,
    code: PropTypes.elementType,
  }),
};

Translate.defaultProps = {
  tagProps: [],
  tagMap: {},
};

export default Translate;
