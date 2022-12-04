const sanitizeId = (id, iconId) => `${id}--${iconId}`;

const sanitizeIds = (ids, iconId) =>
  ids.reduce(
    (randomizedIds, id) => ({
      ...randomizedIds,
      [id]: sanitizeId(id, iconId),
    }),
    {},
  );

export default sanitizeIds;
