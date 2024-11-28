export const CloudinaryImageConfig = {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 90,
    format: 'auto',
    maxFileSize: 2 * 1024 * 1024,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    transformation: [
      { width: 'auto', crop: 'scale', quality: 'auto:good', strip:true,dpr:'2.0',fetch_format: 'auto' },
    ]
  };
  