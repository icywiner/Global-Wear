declare module 'react-window' {
  import * as React from 'react';
  export interface ListChildComponentProps<T = any> {
    index: number;
    style: React.CSSProperties;
    data: T;
  }
  export const FixedSizeList: any;
  export const VariableSizeList: any;
  const _default: any;
  export default _default;
}
