declare module 'react-quill-new' {
  import * as React from 'react';
  
  export interface ReactQuillProps {
    theme?: string;
    value?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
    className?: string;
  }
  
  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}