import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseMessageDto } from 'src/common/dto/Response/response-message.dto';
import { ProductService } from 'src/product/product.service';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';


@Injectable()
export class CloudinaryService {

  constructor(
    private readonly productService: ProductService,
    @Inject('CLOUDINARY') private readonly cloudinary: typeof Cloudinary,
  ) {

  }

  async uploadProduct(file: Express.Multer.File, productId: string): Promise<ResponseMessageDto> {
    if (!file) throw new BadRequestException('No file uploaded');

    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException('Product not found');

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error, result: UploadApiResponse) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    product.images?.length ? product.images.push(result.secure_url) : product.images = [result.secure_url];
    await this.productService.update(productId, { images: product.images });
    return { message: 'Product created successfully' };
  }

  async uploadProducts(files: Express.Multer.File[], productId: string) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException('Product not found');


    const uploadedUrls: string[] = [];

    for (const file of files) {
      const result: UploadApiResponse = await Cloudinary.uploader.upload(file.path, {
        folder: 'products',
        resource_type: 'image',
      });
      uploadedUrls.push(result.secure_url);
    }

    product.images?.length ? product.images.push(...uploadedUrls) : product.images = uploadedUrls;

    await this.productService.update(productId, product);

    return { message: 'Product created successfully', product };
  }
}
