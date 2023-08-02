const getRecursiveChildText = (reactNode) => {
  const children = reactNode?.props?.children || undefined;
  const secondaryLabel = reactNode?.props?.secondaryLabel || undefined;
  let joinedNodes = [];
  if (secondaryLabel) {
    joinedNodes.push(getRecursiveChildText(secondaryLabel))
  }
  if (Array.isArray(reactNode)) {
      // Multiple children
      reactNode.forEach(node => {
          if (typeof node === "object") joinedNodes.push(getRecursiveChildText(node));
          else if (typeof node === "string" || typeof node === "number") joinedNodes.push(node);
      });
  }
  if (children === undefined) {
      if (typeof reactNode === "string" || typeof children === "number") {
        joinedNodes.push(reactNode)
      }
  }
  if (typeof children === "object") {
      // Found direct child
      joinedNodes.push(getRecursiveChildText(reactNode.props.children));
  }
  if (typeof children === "string" || typeof children === "number") {
      // Found searchable string
      joinedNodes.push(reactNode.props.children);
  }

  return joinedNodes.join("")
};

export default getRecursiveChildText