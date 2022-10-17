import { exec } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';

const PAGE_DIR = './src/pages';
const PAGE_STYLED_DIR = './src/styles/pageStyled';
const COMPONENT_DIR = './src/components';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const createIndexFileText = name => {
  return [`export * from './${name}';`, `export { default } from './${name}';`, ``].join('\n');
};

const createComponentFileText = name => {
  return [
    `import clsx from 'clsx';`,
    ``,
    `import { ${name}Styled } from './styled';`,
    ``,
    `export interface ${name}Props {`,
    `  className?: string;`,
    `}`,
    ``,
    `const ${name} = ({ className }: ${name}Props) => {`,
    `  return (`,
    `    <${name}Styled className={clsx('${name}', className)}>`,
    `      `,
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

const createComponentAndFileOpen = (dir, name) => {
  fs.mkdirSync(dir);
  fs.writeFileSync(`${dir}/styled.ts`, createStyledFileText(name));
  fs.writeFileSync(`${dir}/${name}.tsx`, createComponentFileText(name));
  fs.writeFileSync(`${dir}/index.ts`, createIndexFileText(name));

  console.log(`🎉 Component [${name}] created`);
  console.log(`📂 Open file...`);

  exec(`code -g ${dir}/${name}.tsx:12:7`);
};

const start = async () => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Choose type',
      choices: ['component', 'page'],
      default: 'component',
    },
  ]);

  switch (type) {
    case 'component': {
      const { componentName } = await inquirer.prompt([
        createPromptInput({
          name: 'componentName',
          label: 'Component name (PascalCase)',
        }),
      ]);

      const componentDir = `${COMPONENT_DIR}/${componentName}`;

      if (fs.existsSync(componentDir)) {
        console.log(`🛑 Component [${componentName}] already exists`);
        process.exit(0);
      }

      createComponentAndFileOpen(componentDir, componentName);
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

      // camelCase 처리
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

      // 페이지 파일 중복 체크
      if (fs.existsSync(pagePath)) {
        console.log(`🛑 [${pagePath}] already exists`);
        process.exit(0);
      }

      // 페이지 스타일 파일 중복 체크
      if (fs.existsSync(`${PAGE_STYLED_DIR}/${name}PageStyled.ts`)) {
        console.log(`🛑 [${PAGE_STYLED_DIR}/${name}PageStyled.ts] already exists`);
        process.exit(0);
      }

      // 페이지 dir이 없다면 생성
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // 페이지 스타일 dir이 없다면 생성
      if (!fs.existsSync(PAGE_STYLED_DIR)) {
        fs.mkdirSync(PAGE_STYLED_DIR, { recursive: true });
      }

      // 페이지 스타일 파일 생성
      fs.writeFileSync(
        `${PAGE_STYLED_DIR}/${name}PageStyled.ts`,
        createStyledFileText(capitalize(name) + 'Page'),
      );

      // 페이지 파일 생성
      fs.writeFileSync(pagePath, createPageFileText(name));

      console.log(`🎉 Page [${name}] created`);
      console.log(`📂 Open file...`);

      exec(`code -g ${pagePath}:8:7`);
      break;
    }
  }
};

start();
