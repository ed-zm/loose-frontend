import React, { useState, useEffect } from "react";
import { TabNav } from "@primer/components";
import axios from "axios";
import { useLazyQuery } from "@apollo/react-hooks";
import Markdown from "react-markdown";
import FileReaderInput from "react-file-reader-input";
import classnames from "classnames";
import TextArea from "../TextArea";
import { GET_S3_SIGNED_URL } from "./index.graphql";
import "./index.scss";

var IMAGE_MIME_REGEX = /^image\/(p?jpeg|gif|png)$/i;

const TextAreaMD = (props) => {
  const [showPreview, setShowPreview] = useState(false);
  const [blob, setBlob] = useState(null);
  const [currentImage, setCurrentImage] = useState({ name: "", fileType: "image/jpg" });
  const [getS3SignedUrl, { data: s3Url, error, loading }] = useLazyQuery(GET_S3_SIGNED_URL);
  useEffect(() => {
    if (s3Url) {
      new Promise(async (resolve) => {
        const res = await axios.put(s3Url.getS3SignedUrl, blob, { headers: { "Content-Type": currentImage.fileType } });
        resolve(res);
      })
        .then(async (res) => {
          const [name] = currentImage.name.split(".");
          const [url] = res.config.url.split("?");
          if (!props.value) {
            await props.onChange({ target: { value: `![${name}](${url})` } });
          } else {
            await props.onChange({ target: { value: `${props.value}\n![${name}](${url})` } });
          }
          props;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [s3Url]);

  useEffect(() => {
    const fileInput = document.getElementById("markdown-file-upload");
    document.onpaste = (e) => {
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (IMAGE_MIME_REGEX.test(items[i].type)) {
          const list = new DataTransfer();
          list.items.add(items[i].getAsFile());
          fileInput.files = list.files;
          const event = new Event("change", { bubbles: true });
          fileInput.dispatchEvent(event);
          return;
        }
      }
    };
  }, []);

  const selectPicture = async (results) => {
    console.log("SELECT PICTURE", results);
    const result = results && !!results.length && results[0];
    if (result) {
      const [e, file] = result;
      const [name, fileType] = file.name.split(".");
      await setBlob(e.target.result);
      await setCurrentImage({ name, fileType: `image/${fileType}` });
      console.log(name, fileType);
      await getS3SignedUrl({
        variables: {
          operation: "putObject",
          fileType: `image/${fileType}`,
          id: name,
          random: true,
        },
      });
    }
  };

  return (
    <div className="textarea-md-container">
      <TabNav aria-label="Main">
        <TabNav.Link selected={!showPreview}>
          <span className="textarea-md-tab" onClick={() => setShowPreview(false)}>
            Write
          </span>
        </TabNav.Link>
        <TabNav.Link selected={showPreview}>
          <span className="textarea-md-tab" onClick={() => setShowPreview(true)}>
            Preview
          </span>
        </TabNav.Link>
      </TabNav>
      <div className="textarea-md-content-container">
        {showPreview ? (
          <div className="textarea-md-markdown-wrapper">
            <Markdown className="markdown-body" source={props.value} />
          </div>
        ) : (
          <TextArea className="textarea-md-textarea" {...props} />
        )}
        {!showPreview && (
          <FileReaderInput as="buffer" onChange={async (e, pic) => await selectPicture(pic)} id="markdown-file-upload">
            <span className={classnames("textarea-md-attach")}>
              Attach files by dragging & dropping, selecting or pasting them.
            </span>
          </FileReaderInput>
        )}
      </div>
    </div>
  );
};

export default TextAreaMD;
