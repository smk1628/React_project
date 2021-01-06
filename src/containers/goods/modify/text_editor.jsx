import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class text_editor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }
    setRichText = (html)=>{
        //let html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        let contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.setState({
            editorState
          })
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }
    getRichText = ()=> {
        const { editorState } = this.state;
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    render() {
        const { editorState } = this.state;
        return (
        <div>
            <Editor
            editorState={editorState}
            // wrapperClassName="demo-wrapper" /* 自定义定义样式 */
            // editorClassName="demo-editor" /* 自定义定义样式 */
            wrapperStyle={{
                border: '1px solid #aaa',
                background:'#ffffff'
            }}
            editorStyle={{
                lineHeight: '5px',
                minHeight: '200px',
                maxHeight: '200px'
            }}
            onEditorStateChange={this.onEditorStateChange}
            />
        </div>
        );
    }
}
