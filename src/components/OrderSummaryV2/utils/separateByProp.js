const separateByProp = (items = [], property, value) =>
  items.reduce(
    (separatedItems, item) => {
      const index = item[property] === value ? 0 : 1;
      separatedItems[index].push(item);
      return separatedItems;
    },
    [[], []],
  );

export default separateByProp;
