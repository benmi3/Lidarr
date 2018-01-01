import PropTypes from 'prop-types';
import React from 'react';
import albumEntities from 'Album/albumEntities';
import AlbumTitleLink from 'Album/AlbumTitleLink';
import EpisodeStatusConnector from 'Album/EpisodeStatusConnector';
import AlbumSearchCellConnector from 'Album/AlbumSearchCellConnector';
import ArtistNameLink from 'Artist/ArtistNameLink';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import styles from './MissingRow.css';

function MissingRow(props) {
  const {
    id,
    // trackFileId,
    artist,
    releaseDate,
    albumType,
    title,
    isSelected,
    columns,
    onSelectedChange
  } = props;

  return (
    <TableRow>
      <TableSelectCell
        id={id}
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
      />

      {
        columns.map((column) => {
          const {
            name,
            isVisible
          } = column;

          if (!isVisible) {
            return null;
          }

          if (name === 'artist.sortName') {
            return (
              <TableRowCell key={name}>
                <ArtistNameLink
                  nameSlug={artist.nameSlug}
                  artistName={artist.artistName}
                />
              </TableRowCell>
            );
          }

          // if (name === 'episode') {
          //   return (
          //     <TableRowCell
          //       key={name}
          //       className={styles.episode}
          //     >
          //       <SeasonEpisodeNumber
          //         seasonNumber={seasonNumber}
          //         episodeNumber={episodeNumber}
          //         absoluteEpisodeNumber={absoluteEpisodeNumber}
          //         sceneSeasonNumber={sceneSeasonNumber}
          //         sceneEpisodeNumber={sceneEpisodeNumber}
          //         sceneAbsoluteEpisodeNumber={sceneAbsoluteEpisodeNumber}
          //       />
          //     </TableRowCell>
          //   );
          // }

          if (name === 'albumTitle') {
            return (
              <TableRowCell key={name}>
                <AlbumTitleLink
                  albumId={id}
                  artistId={artist.id}
                  albumEntity={albumEntities.WANTED_MISSING}
                  albumTitle={title}
                  showOpenArtistButton={true}
                />
              </TableRowCell>
            );
          }

          if (name === 'albumType') {
            return (
              <TableRowCell key={name}>
                {albumType}
              </TableRowCell>
            );
          }

          if (name === 'releaseDate') {
            return (
              <RelativeDateCellConnector
                key={name}
                date={releaseDate}
              />
            );
          }

          // if (name === 'status') {
          //   return (
          //     <TableRowCell
          //       key={name}
          //       className={styles.status}
          //     >
          //       <EpisodeStatusConnector
          //         albumId={id}
          //         trackFileId={trackFileId}
          //         albumEntity={albumEntities.WANTED_MISSING}
          //       />
          //     </TableRowCell>
          //   );
          // }

          if (name === 'actions') {
            return (
              <AlbumSearchCellConnector
                key={name}
                albumId={id}
                artistId={artist.id}
                albumTitle={title}
                albumEntity={albumEntities.WANTED_MISSING}
                showOpenArtistButton={true}
              />
            );
          }

          return null;
        })
      }
    </TableRow>
  );
}

MissingRow.propTypes = {
  id: PropTypes.number.isRequired,
  // trackFileId: PropTypes.number,
  artist: PropTypes.object.isRequired,
  releaseDate: PropTypes.string.isRequired,
  albumType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedChange: PropTypes.func.isRequired
};

export default MissingRow;
