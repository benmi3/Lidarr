import PropTypes from 'prop-types';
import React from 'react';
import Button from 'Components/Link/Button';
import ModalBody from 'Components/Modal/ModalBody';
import ModalContent from 'Components/Modal/ModalContent';
import ModalFooter from 'Components/Modal/ModalFooter';
import ModalHeader from 'Components/Modal/ModalHeader';
import { scrollDirections } from 'Helpers/Props';
import InteractiveSearchConnector from 'InteractiveSearch/InteractiveSearchConnector';

function AlbumInteractiveSearchModalContent(props) {
  const {
    albumId,
    albumTitle,
    onModalClose
  } = props;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        Interactive Search  {albumId != null && `- ${albumTitle}`}
      </ModalHeader>

      <ModalBody scrollDirection={scrollDirections.BOTH}>
        <InteractiveSearchConnector
          type="album"
          searchPayload={{
            albumId
          }}
        />
      </ModalBody>

      <ModalFooter>
        <Button onPress={onModalClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

AlbumInteractiveSearchModalContent.propTypes = {
  albumId: PropTypes.number.isRequired,
  albumTitle: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default AlbumInteractiveSearchModalContent;
