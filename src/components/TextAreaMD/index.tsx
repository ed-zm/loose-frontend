import React, { useState } from 'react'
import Markdown from 'react-markdown'
import classnames from 'classnames'
import TextArea from '../TextArea'
import './index.scss'

const TextAreaMD = (props) => {
  const [ showPreview, setShowPreview ]  = useState(false)
  return(
    <div className = 'textarea-md-container'>
      <div className = 'textarea-md-header'>
        <span className = { classnames('textarea-md-tab', { 'textarea-md-tab-selected': !showPreview }) } onClick = {() => setShowPreview(false)}>Write</span>
        <span className = { classnames('textarea-md-tab', { 'textarea-md-tab-selected': showPreview }) } onClick = {() => setShowPreview(true)}>Preview</span>
      </div>
      <div className = 'textarea-md-content-container'>
        { showPreview ?
        <div className = 'textarea-md-markdown-wrapper'>
          <Markdown className = '' source = {props.value} />
        </div> :
        <TextArea { ...props } /> }
      </div>
    </div>
  )
}

export default TextAreaMD