import PropTypes from 'prop-types';
import css from './ImageGalleryList.module.css';

export const ImageGalleryList = ({ children }) => {
  return <ul className={css.imageGalleryList}>{children}</ul>;
};

ImageGalleryList.propTypes = {
  children: PropTypes.object,
};
