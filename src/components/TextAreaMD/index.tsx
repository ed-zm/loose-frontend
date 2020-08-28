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

const TextAreaMD = (props) => {
  const [showPreview, setShowPreview] = useState(false);
  const [blob, setBlob] = useState(null);
  const [currentImage, setCurrentImage] = useState({ name: "", fileType: "image/jpg" });
  const [getS3SignedUrl, { data: s3Url, error, loading }] = useLazyQuery(GET_S3_SIGNED_URL);
  useEffect(() => {
    if (s3Url) {
      new Promise(async (resolve) => {
        const res = await axios.put(s3Url.getS3SignedUrl, blob, { headers: { "Content-Type": "image/jpg" } });
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
        .catch(() => {});
    }
  }, [s3Url]);

  const selectPicture = async (results) => {
    const result = results && !!results.length && results[0];
    if (result) {
      const [e, file] = result;
      const [name, fileType] = file.name.split(".");
      await setBlob(e.target.result);
      await setCurrentImage({ name, fileType: `image/${fileType}` });
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
        <TabNav.Link onClick={() => setShowPreview(true)} selected={!showPreview}>
          Write
        </TabNav.Link>
        <TabNav.Link onClick={() => setShowPreview(false)} selected={showPreview}>
          Preview
        </TabNav.Link>
      </TabNav>
      <div className="textarea-md-content-container">
        {showPreview ? (
          <div className="textarea-md-markdown-wrapper">
            <Markdown className="" source={props.value} />
          </div>
        ) : (
          <TextArea className="textarea-md-textarea" {...props} />
        )}
        {!showPreview && (
          <FileReaderInput as="buffer" onChange={async (e, pic) => await selectPicture(pic)}>
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
