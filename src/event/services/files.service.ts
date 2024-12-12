import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCatalogueDto } from '../dto';
import { Repository } from 'typeorm';
import { FileEntity } from '../entities/file.entity';
import { CloudinaryService } from './cloudinary.service';
import { CoreRepositoryEnum } from '../enums/repository.enum';

@Injectable()
export class FilesService {
  constructor(
    @Inject(CoreRepositoryEnum.FILE_REPOSITORY)
    private readonly repository: Repository<FileEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  private async handleSaveError(uploadedImages: CloudinaryResponse[]) {
    await Promise.all(
      uploadedImages.map((image) =>
        this.cloudinaryService.deleteImage(image.publicId),
      ),
    );
  }

  async create(
    images: CloudinaryResponse[],
    entityId: string,
  ): Promise<FileEntity[]> {
    
    try {
      const newImages = await Promise.all(
        images.map(async (image: CloudinaryResponse) => {
          const newImage = this.repository.create({ ...image, entityId });
          await this.repository.save(newImage);

          return newImage;
        }),
      );
      return newImages;
    } catch (error) {
      console.error(error);
      this.handleSaveError(images);
    }
  }

  async findAll() {
    const catalogues = await this.repository.find();

    return catalogues;
  }

  async findOne(id: string) {
    const event = await this.repository.findOne({
      where: { id: id },
    });
    return event;
  }

  async update(id: string, payload: UpdateCatalogueDto) {
    const event = await this.repository.preload({ id: id, ...payload });
    if (!event) throw new NotFoundException('Catalogue not found');
    try {
      await this.repository.save(event);
      return event;
    } catch (error) {
      console.log(error);

      return 'Error updating catalogue';
    }
  }

  async delete(id: string) {
    const catalogue = await this.repository.softDelete(id);
    return catalogue;
  }
}
