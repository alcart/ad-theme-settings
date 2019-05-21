export const addMediaOpener = (imgTarget, callback) => {
  let mediaData = [];

  if (metaImageFrame) {
    metaImageFrame.open();
  }

  let metaImageFrame = wp.media.frames.meta_image_frame = wp.media({
    title: "Select Image",
    button: {
      text: "Select"
    },
    multiple: false
  });

  // Runs when an image is selected.
  metaImageFrame.on('select', function () {
    // Grabs the attachment selection and creates a JSON representation of the model.
    let media_attachment = metaImageFrame.state().get('selection').toJSON()[0];
    
    mediaData = {
      url: media_attachment.url,
      id: media_attachment.id
    };
    
    callback(mediaData);
    metaImageFrame.close();
  });
  // Opens the media library frame.
  metaImageFrame.open();
  
};