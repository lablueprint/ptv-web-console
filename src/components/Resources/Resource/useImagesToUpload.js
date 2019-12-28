import { useReducer } from 'react';

/*
   *  Store images that will be uploaded on submit.
   *
   * imagesToUpload is an object of all referenced images in the editor:
   *  {
   *    ...
   *    [hash of the 64-bit encoded image]: {
   *      count: number of references to this image,
   *      file: the image file
   *    },
   *    ...
   *  }
   *  The hash makes the encoded image a much smaller, easier to manage size.
   *  The count makes it so the same file can be referenced from storage multiple times.
   *
   * imagesToUpload is an object rather than an array in order to achieve O(1) lookup.
   */
export default function useImagesToUpload() {
  const [imagesToUpload, dispatch] = useReducer((state, action) => {
    const newState = state;
    switch (action.type) {
      /*
       * Receive a singleton object action.data:
       *  {
       *    [hash of the 64-bit encoded image]: image file,
       *  }
       */
      case useImagesToUpload.types.insert:
        Object.entries(action.data).forEach(([encodedImageHash, file]) => {
          if (newState[encodedImageHash]) {
            newState[encodedImageHash].count += 1;
          } else {
            newState[encodedImageHash] = {
              count: 1,
              file,
            };
          }
        });
        return newState;

      /*
       * Receive a singleton object action.data:
       *  {
       *    deletedImageHash: hash of the 64-bit encoded image,
       *  }
       */
      case useImagesToUpload.types.delete:
        if (newState[action.data.deletedImageHash].count === 1) {
          delete newState[action.data.deletedImageHash];
        } else {
          newState[action.data.deletedImageHash].count -= 1;
        }
        return newState;
      default:
        throw new Error();
    }
  }, {});
  return [imagesToUpload, dispatch];
}

useImagesToUpload.types = {
  insert: 'INSERT',
  delete: 'DELETE',
};
