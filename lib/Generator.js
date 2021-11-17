const { getTagList } = require('./request');
const ora = require('ora');
const path = require('path');
const inquirer = require('inquirer');
const util = require('util');
const { REPO, MAP_TEMPLATE_TYPES, REACT_TEMPLATES_OPTIONS, MAP_TYPES_TAGS } = require('./config');
const downloadGitRepo = require('download-git-repo');

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();

  try {
    const result = await fn(...args);
    spinner.succeed();

    return result;
  } catch (error) {
    console.log(error);
    spinner.fail('Request failed, please retry ...');
  }
}

class Generator {
  constructor({ type }) {
    this.type = type;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async download(tag) {
    const requestUrl = `${REPO}${tag ? `#${tag}` : ''}`;
    await wrapLoading(
      this.downloadGitRepo,
      'Downloading template',
      requestUrl,
      path.resolve(process.cwd()),
    );
  }

  async getRepoTags() {
    const tagList = await wrapLoading(getTagList, 'Fetching templates info...');
    if (!tagList) return;

    const tagNames = tagList.map((item) => item.name);

    const { tagName } = await inquirer.prompt({
      name: 'tagName',
      type: 'list',
      choices: tagNames,
      message: 'Please choose a template',
    });

    return tagName;
  }

  async create() {
    switch (this.type) {
      case MAP_TEMPLATE_TYPES.reactComponent:
        this.createReactTemplate();
        break;

      default:
        break;
    }
  }

  async createReactTemplate() {
    const { reactComopnentType } = await inquirer.prompt({
      name: 'reactComopnentType',
      type: 'list',
      choices: REACT_TEMPLATES_OPTIONS,
      message: 'Please choose a template type',
    });

    await this.download(MAP_TYPES_TAGS[reactComopnentType]);
  }
}

module.exports = Generator;
