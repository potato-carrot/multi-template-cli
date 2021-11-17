const REPO = 'potato-carrot/templates';

const MAP_TEMPLATE_TYPES = {
  reactComponent: 'react component',
  readme: 'readme',
};

//  Mapping custom options to github repo tags
const MAP_TYPES_TAGS = {
  'React Hooks Component': 'react-class',
  'React Class Component': 'react-hooks',
};

const REACT_TEMPLATES_OPTIONS = ['React Class Component', 'React Hooks Component'];

// Template types supported
const TEMPLATE_TYPES = Object.keys(MAP_TEMPLATE_TYPES).map((key) => MAP_TEMPLATE_TYPES[key]);

module.exports = {
  REPO,
  TEMPLATE_TYPES,
  MAP_TEMPLATE_TYPES,
  REACT_TEMPLATES_OPTIONS,
  MAP_TYPES_TAGS,
};
