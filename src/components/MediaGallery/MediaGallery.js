import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "@carbon/react";
import {
  ChevronLeft as ChevronLeft32,
  ChevronRight as ChevronRight32,
} from "@carbon/react/icons";
import PaginationNav from "./components/PaginationNav";
import MediaDisplay from "./components/MediaDisplay";
// import { documentLanguage } from "../../utils/getLocale";

class MediaGallery extends Component {
  static propTypes = {
    /**
     * An array of media images and videos that can be
     */
    media: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        caption: PropTypes.string,
        type: PropTypes.string,
        url: PropTypes.string,
        onError: PropTypes.func,
        sources: PropTypes.arrayOf({
          type: PropTypes.string,
          url: PropTypes.string,
          alt: PropTypes.string,
          tracks: PropTypes.arrayOf(
            PropTypes.shape({
              lng: PropTypes.string,
              src: PropTypes.string,
              label: PropTypes.label,
            })
          ),
        }),
      })
    ).isRequired,
    /**
     * A function to fire off upon selecting an image.
     */
    onSelect: PropTypes.func,
    /**
     * The label to use for the next button.
     */
    nextLabel: PropTypes.string.isRequired,
    /**
     * The label to use when selecting an option.
     */
    optionLabel: PropTypes.string.isRequired,
    /**
     * The label to use when selecting the previous option.
     */
    previousLabel: PropTypes.string.isRequired,
    /**
     * The label to use for the select element if there are over 5 images.
     */
    selectLabel: PropTypes.string.isRequired,
    /**
     * The locale used for translating the strings.
     */
    // locale: PropTypes.string,
    /**
     * A boolean to allow rendering an enlarged version of the image in a modal when clicking it.
     */
    canClickToEnlarge: PropTypes.bool,
  };

  static defaultProps = {
    canClickToEnlarge: false,
    // locale: documentLanguage,
    onSelect: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      openModal: false,
    };
  }

  onSelect = ({ index }) => {
    const { media, onSelect } = this.props;
    this.setState({ selectedIndex: index });
    onSelect(media[index]);
  };

  onImageClick = () => {
    this.setState({
      openModal: true,
    });
  };

  onModalClose = () => {
    this.setState({
      openModal: false,
    });
  };

  onPrevClick = () => {
    const { selectedIndex } = this.state;
    this.onSelect({ index: selectedIndex - 1 });
  };

  onNextClick = () => {
    const { selectedIndex } = this.state;
    this.onSelect({ index: selectedIndex + 1 });
  };

  render() {
    const { selectedIndex, openModal } = this.state;
    const {
      media,
      optionLabel,
      previousLabel,
      nextLabel,
      selectLabel,
      // locale,
      canClickToEnlarge,
    } = this.props;
    const item = media[selectedIndex];

    return (
      <div className="pal--media-gallery">
        <MediaDisplay
          type={item.type}
          index={selectedIndex}
          sources={item.sources || [item]}
          onError={item.onError}
          onImageClick={canClickToEnlarge ? this.onImageClick : undefined}
        >
          <div className="pal--media-gallery__controls">
            <PaginationNav
              onSelect={this.onSelect}
              optionLabel={optionLabel}
              previousLabel={previousLabel}
              nextLabel={nextLabel}
              numItems={media.length}
              selectLabel={selectLabel}
              // locale={locale}
              currentSelected={selectedIndex + 1}
            />
            <p>{item.caption}</p>
          </div>
        </MediaDisplay>
        {canClickToEnlarge && (
          <Modal
            aria-label="media modal"
            className="pal--media-gallery__modal"
            modalHeading={item.caption || item.alt || ""}
            open={openModal}
            onRequestClose={this.onModalClose}
            passiveModal
            size="lg"
          >
            {openModal && (
              <MediaDisplay
                type={item.type}
                index={selectedIndex}
                sources={item.sources || [item]}
                onError={item.onError}
              />
            )}
            {selectedIndex > 0 && (
              <button
                aria-label="previous media"
                type="button"
                className="pal--media-gallery__modal-left"
                onClick={this.onPrevClick}
              >
                <ChevronLeft32 />
              </button>
            )}
            {selectedIndex < media.length - 1 && (
              <button
                aria-label="next media"
                type="button"
                className="pal--media-gallery__modal-right"
                onClick={this.onNextClick}
              >
                <ChevronRight32 />
              </button>
            )}
          </Modal>
        )}
      </div>
    );
  }
}

export default MediaGallery;
