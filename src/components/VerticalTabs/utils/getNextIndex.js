const match = (eventOrCode, { key, which, keyCode, code } = {}) => {
  if (typeof eventOrCode === 'string') {
    return eventOrCode === key;
  }

  if (typeof eventOrCode === 'number') {
    return eventOrCode === which || eventOrCode === keyCode;
  }

  if (eventOrCode.key && Array.isArray(key)) {
    return key.indexOf(eventOrCode.key) !== -1;
  }

  return (
    eventOrCode.key === key ||
    eventOrCode.which === which ||
    eventOrCode.keyCode === keyCode ||
    eventOrCode.code === code
  );
};

const getNextIndex = (event, total, index) => {
  switch (true) {
    case event.code === 'ArrowDown':
      return (index + 1) % total;

    case event.code === 'ArrowUp':
      return (total + index - 1) % total;

    case event.code === 'Home':
      return 0;

    case event.code === 'End':
      return total - 1;

    default:
      return index;
  }
};

export default getNextIndex;
