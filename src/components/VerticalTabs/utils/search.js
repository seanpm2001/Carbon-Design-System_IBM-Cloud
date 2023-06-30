import Fuse from 'fuse.js'



const search = (list, filter) => {
  const options = { keys: ["text"]}
  const fuse = new Fuse(list, options);

  // search
  return fuse.search(filter)
};

export default search