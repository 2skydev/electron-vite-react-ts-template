import { exec } from 'child_process';
import fs from 'fs';
import { readdir } from 'fs/promises';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';

inquirer.registerPrompt('autocomplete', inquirerPrompt);

const PAGE_DIR = './src/pages';
const PAGE_STYLED_DIR = './src/styles/pageStyled';
const COMPONENT_DIR = './src/components';
const FEATURES_DIR = './src/features';

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const createIndexFileText = name => {
  return [
    `// === Automatically generated file. Don't edit it. ===`,
    `export * from './${name}';`,
    `export { default } from './${name}';`,
    ``,
  ].join('\n');
};

const createComponentFileText = name => {
  return [
    `import { ReactNode } from 'react';`,
    ``,
    `import clsx from 'clsx';`,
    ``,
    `import { ${name}Styled } from './styled';`,
    ``,
    `export interface ${name}Props {`,
    `  className?: string;`,
    `  children?: ReactNode;`,
    `}`,
    ``,
    `const ${name} = ({ className, children }: ${name}Props) => {`,
    `  return (`,
    `    <${name}Styled className={clsx('${name}', className)}>`,
    `      {children}`,
    `    </${name}Styled>`,
    `  );`,
    `};`,
    ``,
    `export default ${name};`,
    ``,
  ].join('\n');
};

const createStyledFileText = name => {
  return [
    `import styled from 'styled-components';`,
    ``,
    `export const ${name}Styled = styled.div\``,
    `  `,
    `\`;`,
    ``,
  ].join('\n');
};

const createPageFileText = name => {
  return [
    // prettier-ignore
    `import { ${capitalize(name)}PageStyled } from '~/styles/pageStyled/${name}PageStyled';`,
    ``,
    `const ${capitalize(name)} = () => {`,
    `  return (`,
    `    <${capitalize(name)}PageStyled>`,
    `      `,
    `    </${capitalize(name)}PageStyled>`,
    `  );`,
    `};`,
    ``,
    `export default ${capitalize(name)};`,
    ``,
  ].join('\n');
};

const createPromptInput = options => {
  const { name = 'name', label } = options;

  return {
    type: 'input',
    name,
    message: `${label}:`,
    validate: input => {
      return String(input).trim().length > 0 || `${label} is required`;
    },
  };
};

const editParentComponentExportFile = async parentComponentName => {
  const parentComponentDir = `${COMPONENT_DIR}/${parentComponentName}`;
  const parentComponentExportFile = `${parentComponentDir}/index.ts`;

  const subComponentNames = await getDirectories(parentComponentDir);

  let texts = [
    `// === Automatically generated file. Don't edit it. ===`,
    `import _${parentComponentName} from './${parentComponentName}';`,
  ];

  texts.push(
    ...subComponentNames.map(
      subComponentName => `import ${subComponentName} from './${subComponentName}';`,
    ),
  );

  texts.push(
    ...[
      ``,
      `type _${parentComponentName} = typeof _${parentComponentName};`,
      ``,
      `interface ${parentComponentName}Type extends _${parentComponentName} {`,
      ...subComponentNames.map(
        subComponentName => `  ${subComponentName}: typeof ${subComponentName};`,
      ),
      `}`,
      ``,
      `const ${parentComponentName} = _${parentComponentName} as ${parentComponentName}Type;`,
      ``,
      ...subComponentNames.map(
        subComponentName => `${parentComponentName}.${subComponentName} = ${subComponentName};`,
      ),
      ``,
      `export default ${parentComponentName};`,
      ``,
    ],
  );

  fs.writeFileSync(parentComponentExportFile, texts.join('\n'));
};

const createComponentAndFileOpen = (dir, name) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/styled.ts`, createStyledFileText(name));
  fs.writeFileSync(`${dir}/${name}.tsx`, createComponentFileText(name));
  fs.writeFileSync(`${dir}/index.ts`, createIndexFileText(name));

  console.log(`🎉 Component [${name}] created`);
  console.log(`📂 Open file...`);

  exec(`code -g ${dir}/${name}.tsx:15:17`);
};

const start = async () => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Choose type',
      choices: ['feature', 'page', 'component', 'sub-component'],
      default: 'feature',
    },
  ]);

  switch (type) {
    case 'feature': {
      const { featureName, componentName } = await inquirer.prompt([
        createPromptInput({ name: 'featureName', label: 'Feature name (camelCase)' }),
        createPromptInput({
          name: 'componentName',
          label: 'Component name (PascalCase)',
        }),
      ]);

      const featureDir = `${FEATURES_DIR}/${featureName}`;
      const componentDir = `${featureDir}/${componentName}`;

      // check component dir already exists
      if (fs.existsSync(componentDir)) {
        console.log(`🛑 Component [${componentName}] already exists`);
        process.exit(0);
      }

      // not found feature dir -> create dir
      if (!fs.existsSync(featureDir)) {
        fs.mkdirSync(featureDir, { recursive: true });
      }

      createComponentAndFileOpen(componentDir, componentName);
      break;
    }

    case 'component': {
      const { componentName } = await inquirer.prompt([
        createPromptInput({
          name: 'componentName',
          label: 'Component name (PascalCase)',
        }),
      ]);

      const componentDir = `${COMPONENT_DIR}/${componentName}`;

      // check component dir already exists
      if (fs.existsSync(componentDir)) {
        console.log(`🛑 Component [${componentName}] already exists`);
        process.exit(0);
      }

      createComponentAndFileOpen(componentDir, componentName);

      break;
    }

    case 'sub-component': {
      const componentNames = await getDirectories(COMPONENT_DIR);

      const { parentComponentName } = await inquirer.prompt([
        {
          type: 'autocomplete',
          name: 'parentComponentName',
          message: 'Choose component',
          source: (_, input) => {
            return componentNames.filter(name =>
              name.toLowerCase().includes((input || '').toLowerCase()),
            );
          },
        },
      ]);

      const { componentName } = await inquirer.prompt([
        createPromptInput({
          name: 'componentName',
          label: 'Sub component name (PascalCase)',
        }),
      ]);

      const componentDir = `${COMPONENT_DIR}/${parentComponentName}/${componentName}`;

      // check component dir already exists
      if (fs.existsSync(componentDir)) {
        console.log(`🛑 Component [${componentName}] already exists`);
        process.exit(0);
      }

      createComponentAndFileOpen(componentDir, componentName);
      await editParentComponentExportFile(parentComponentName);

      break;
    }

    case 'page': {
      let { pagePathInput } = await inquirer.prompt([
        createPromptInput({
          name: 'pagePathInput',
          label: 'Page path (ex: sign/in = sign/in.tsx) (lowercase)',
        }),
      ]);

      pagePathInput = String(pagePathInput.replace(/\.tsx?/, '')).toLowerCase();

      const pagePath = `${PAGE_DIR}/${pagePathInput}.tsx`;
      const dir = pagePath.split('/').slice(0, -1).join('/');
      const nameArray = pagePathInput.split('/');

      // processing camelCase
      let name = nameArray
        .reduce((acc, item, i) => {
          if (i === 0) return [item];

          if (i === nameArray.length - 1) {
            if (item === 'index' && dir !== './pages') {
              const name = dir.split('/').pop();

              return [...acc.slice(0, -1), nameArray.length === 2 ? name : capitalize(name)];
            }
          }

          return [...acc, capitalize(item)];
        }, [])
        .join('');

      // check page file already exists
      if (fs.existsSync(pagePath)) {
        console.log(`🛑 [${pagePath}] already exists`);
        process.exit(0);
      }

      // check page styled file already exists
      if (fs.existsSync(`${PAGE_STYLED_DIR}/${name}PageStyled.ts`)) {
        console.log(`🛑 [${PAGE_STYLED_DIR}/${name}PageStyled.ts] already exists`);
        process.exit(0);
      }

      // not found page dir -> create dir
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // not found styled dir -> create dir
      if (!fs.existsSync(PAGE_STYLED_DIR)) {
        fs.mkdirSync(PAGE_STYLED_DIR, { recursive: true });
      }

      fs.writeFileSync(
        `${PAGE_STYLED_DIR}/${name}PageStyled.ts`,
        createStyledFileText(capitalize(name) + 'Page'),
      );

      fs.writeFileSync(pagePath, createPageFileText(name));

      console.log(`🎉 Page [${name}] created`);
      console.log(`📂 Open file...`);

      exec(`code -g ${pagePath}:6:7`);
      break;
    }
  }
};

start();
