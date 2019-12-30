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
    let newState;
    switch (action.type) {
      /*
       * Receive a singleton object action.data:
       *  {
       *    [hash of the 64-bit encoded image]: image file,
       *  }
       */
      case useImagesToUpload.types.insert:
        newState = state;
        action.data.forEach(({ imageHash, file }) => {
          if (newState[imageHash]) {
            newState[imageHash].count += 1;
          } else {
            newState[imageHash] = {
              count: 1,
              file,
            };
          }
        });
        return newState;

      case useImagesToUpload.types.refresh:
        newState = Object.fromEntries(
          Object.entries(state).map(
            ([imageHash, { file }]) => [imageHash, { count: 0, file }],
          ),
        );
        action.data.currImageHashes.forEach((imageHash) => {
          newState[imageHash].count += 1;
        });
        return newState;
      default:
        throw new Error();
    }
  }, {});
  return [imagesToUpload, dispatch];
}

useImagesToUpload.types = {
  insert: 'INSERT',
  refresh: 'REFRESH',
};
