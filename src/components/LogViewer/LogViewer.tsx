import { List } from 'react-virtualized';

import { Divider } from 'antd';
import clsx from 'clsx';

import { LogViewerStyled } from './styled';

export interface LogViewerProps {
  className?: string;
  path: string;
  lines: string[];
}

const LogViewer = ({ className, path, lines }: LogViewerProps) => {
  return (
    <LogViewerStyled className={clsx('LogViewer', className)}>
      <div className="path selectable">{path}</div>

      <Divider />

      {/* @ts-ignore */}
      <List
        width={500}
        height={300}
        rowCount={lines.length}
        rowHeight={20}
        rowRenderer={({ index, key, style }) => (
          <pre className="selectable" key={key} style={style}>
            {lines[index]}
          </pre>
        )}
      />
    </LogViewerStyled>
  );
};

export default LogViewer;
