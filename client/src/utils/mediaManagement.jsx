import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { uid } from 'uid';

const MediaManagment = () => {
  const storage = getStorage();

  const uploadFile = async ({
    files,
    setUploading,
    setProgress,
    totalBytes,
  }) => {
    const snapShots = [];
    let totalBytesTransferred = 0;

    for (let i = 0; i < files.length; i++) {
      const photo = files[i];
      const uniqueId = uid();
      const storageRef = ref(
        storage,
        'listingsMedia/' + uniqueId + '_' + photo.name,
      );

      const uploadTask = uploadBytesResumable(storageRef, photo);

      setUploading(true);
      const snapshot = await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            reject(error);
          },
          () => {
            resolve(uploadTask.snapshot);
          },
        );
      });
      totalBytesTransferred += snapshot.bytesTransferred;
      const progress = Math.floor((totalBytesTransferred / totalBytes) * 100);
      setProgress(progress); // Update progress here
      snapShots.push(snapshot);
    }

    return snapShots;
  };

  return { uploadFile };
};

export default MediaManagment;
