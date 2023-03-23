import galleryAPI from '../../services/pixabay_api';
import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from 'components/ImageGalleryList/ImageGalleryList';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

const ImageGallery = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState(null);
  const [opened, setOpened] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setPage(1);
    setStatus('pending');
    galleryAPI
      .getImages(searchQuery)
      .then(({ hits, totalHits }) => {
        if (totalHits) {
          setImages(hits);
          setPage(prevPage => prevPage + 1);
          setTotal(totalHits);
          setStatus('resolved');
        } else
          return Promise.reject(
            new Error(`No matches with query: ${searchQuery}`)
          );
      })
      .catch(({ message }) => {
        setError(message);
        setStatus('rejected');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const onLoadMore = () => {
    galleryAPI
      .getImages(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length > 0) {
          setImages(prevState => [...prevState, ...hits]);
          setPage(prevPage => prevPage + 1);
        } else
          return Promise.reject(
            new Error(`No matches with query: ${searchQuery}`)
          );
      })
      .catch(({ message }) => {
        setError(message);
        setStatus('rejected');
      });
  };

  const handleOpenPicture = (src, tags) => {
    const openedImage = {
      src,
      tags,
    };
    setOpened(openedImage);
  };

  const handleClosePicture = evt => {
    if (evt.target.nodeName === 'DIV' || evt.code === 'Escape') setOpened(null);
  };

  if (status === 'idle') return <h3>Enter your search request</h3>;
  if (status === 'pending') return <Loader />;
  if (status === 'rejected') return Notify.failure(error);
  if (status === 'resolved')
    return (
      <>
        <ImageGalleryList>
          <ImageGalleryItem images={images} onClick={handleOpenPicture} />
        </ImageGalleryList>
        {images.length < total ? (
          <Button onClick={onLoadMore} />
        ) : (
          Notify.info(`Last matches with query: ${searchQuery}`)
        )}
        {opened && <Modal openedImage={opened} onClick={handleClosePicture} />}
      </>
    );
};
export default ImageGallery;
