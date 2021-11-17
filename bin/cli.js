#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');

program
  .command('new')
  .description('create a new template')
  .action((options) => {
    require('../lib/create')(options);
  });

program
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]');

program.on('--help', () => {
  console.log(
    `\r\nRun ${chalk.green(`carrot <command> --help`)} for detailed usage of given command\r\n`,
  );

  console.log(
    '\r\n' +
    figlet.textSync('carrot is cool', {
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    }),
  );
});

program.parse(process.argv);
