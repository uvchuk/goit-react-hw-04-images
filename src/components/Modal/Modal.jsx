import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ openedImage: { src, tags }, onClick }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClick);
    return () => {
      window.removeEventListener('keydown', onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.Overlay} onClick={onClick}>
      <div className={css.Modal}>
        <img src={src} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
