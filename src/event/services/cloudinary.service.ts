import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryImageConfig } from 'src/configuration/cloudinary-image-config';
import { envs } from 'src/configuration/envs';

@Injectable()
export class CloudinaryService {
  constructor() {
    // config cloudinary
    cloudinary.config({
      cloud_name: envs.CLOUD_NAME,
      api_key: envs.CLOUDINARY_KEY,
      api_secret: envs.CLOUDINARY_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'events',
          transformation: [CloudinaryImageConfig.transformation[0]],
          resource_type: 'auto',
          unique_filename: true,
        },
        (error, result) => {
          if (error) return reject(error);

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: result.resource_type,
            format: result.format,
            createdAt: result.created_at,
          });
        },
      );

      upload.end(file.buffer);
    });
  }

  async deleteImage(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
  }
}
