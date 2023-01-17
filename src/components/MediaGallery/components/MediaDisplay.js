import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { InlineLoading } from "@carbon/react";

const MediaDisplay = ({
  type,
  sources,
  index,
  children,
  onError,
  onImageClick,
}) => {
  const isEmbededVideo =
    type === "youtube" || type === "vimeo" || type === "embedvideo";
  const videoClass =
    type === "video" || isEmbededVideo
      ? " media-gallery__display--is-video"
      : "";
  const firstSource = sources[0];

  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("active");
  if (!type) {
    console.error("Unable to render content. Asset type is 'null'.");
  }
  useEffect(() => {
    setIsLoading(true);
    setStatus("active");
    const timeoutRef = setTimeout(() => {
      setIsLoading(false);
      setStatus("finished");
    }, 1000);
    return () => {
      clearTimeout(timeoutRef);
    };
  }, [index]);
  return (
    <div className={`pal--media-gallery__display${videoClass}`}>
      <div className="pal--media-gallery__media-wrap">
        {type === "image" && firstSource && (
          <>
            {firstSource.blurredUrl && (
              <img
                className={cx(
                  {
                    "pal--media-gallery--loaded": !isLoading,
                    "pal--media-gallery--overlay-styles": isLoading,
                  },
                  "pal--media-gallery__image"
                )}
                src={firstSource.blurredUrl} // firstSource.blurUrl
                alt={firstSource.alt || firstSource.caption || ""}
              />
            )}
            <button
              className={cx("pal--media-gallery__image-container", {
                "pal--media-gallery__image-clickable": !!onImageClick,
                "pal--media-gallery--loaded":
                  isLoading && firstSource.blurredUrl,
              })}
              onClick={onImageClick}
              type="button"
            >
              <img
                className={cx(
                  {
                    "pal--media-gallery--loaded":
                      isLoading && firstSource.blurredUrl,
                  },
                  "pal--media-gallery__image"
                )}
                src={firstSource.url}
                alt={firstSource.alt || firstSource.caption || ""}
                onLoad={() =>
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 200)
                }
                onError={onError}
              />
            </button>
          </>
        )}
        {isEmbededVideo && firstSource && (
          <>
            {isLoading && (
              <InlineLoading
                description="Loading..."
                iconDescription="Loading indicator"
                status={status}
                successDelay={750}
                onSuccess={() => {
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 200);
                }}
                className="pal--media-gallery__inline-loading"
              />
            )}
            <iframe
              className={cx(
                { "pal--media-gallery--loaded": isLoading },
                "pal--media-gallery__video"
              )}
              src={firstSource.url}
              frameBorder="0"
              allowFullScreen
              onLoad={() => {
                setStatus("finished");
              }}
              title="Media gallery video"
            />
          </>
        )}
        {type && type.includes("video") && (
          <>
            {isLoading && (
              <InlineLoading
                description="Loading..."
                iconDescription="Loading indicator"
                status={status}
                successDelay={750}
                onSuccess={() => {
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 200);
                }}
                className="pal--media-gallery__inline-loading"
              />
            )}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              className={cx(
                { "pal--media-gallery--loaded": isLoading },
                "pal--media-gallery__video"
              )}
              id="lightBoxVideo"
              onCanPlay={() => {
                setStatus("finished");
              }}
              controls
              onError={onError}
            >
              {sources.map((source) => (
                <React.Fragment key={`source-${source.url}`}>
                  {source.tracks &&
                    source.tracks.map((track) => (
                      <track
                        kind="captions"
                        srclng={track.lng} // eslint-disable-line react/no-unknown-property
                        src={track.src}
                        label={track.label}
                      />
                    ))}
                  <source
                    key={source.url}
                    src={source.url}
                    type={source.type}
                  />
                </React.Fragment>
              ))}
            </video>
          </>
        )}
      </div>
      {children}
    </div>
  );
};

MediaDisplay.defaultProps = {
  type: "image",
  sources: [],
  children: null,
};

MediaDisplay.propTypes = {
  /**
   * The type of display video that is being shown.
   */
  type: PropTypes.oneOf([
    "image",
    "youtube",
    "vimeo",
    "embedvideo",
    "video/mp4",
    "video/webm",
  ]),

  /**
   * A function to be ran if the resource couldn't be loaded
   */
  onError: PropTypes.func,

  /**
   * A function to be ran if an image resource is clicked
   */
  onImageClick: PropTypes.func,

  /**
   * If the element is a video sources can be provided.
   */
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      url: PropTypes.string,
      blurredUrl: PropTypes.string,
      alt: PropTypes.string,
      caption: PropTypes.string,
      tracks: PropTypes.arrayOf(
        PropTypes.shape({
          lng: PropTypes.string,
          src: PropTypes.string,
          label: PropTypes.label,
        })
      ),
    })
  ),

  /**
   * Any other children to be rendered under the media element.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),

  /**
   * Index of current media displayed
   */
  index: PropTypes.number.isRequired,
};

export default MediaDisplay;
