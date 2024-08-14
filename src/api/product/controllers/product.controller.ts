import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query } from '@nestjs/common'; // Import the Query decorator

import { RoleIds } from '../../role/enum/role.enum';
import { CreateProductDto, ProductDetailsDto } from '../dto/product.dto';
import { ProductService } from '../services/product.service';
import { Auth } from 'src/api/auth/guards/auth.decorator';
import { FindOneParams } from 'src/common/helper/findOneParams.dto';
import { CurrentUser } from 'src/api/auth/guards/user.decorator';
import { User } from 'src/database/entities/user.entity';
import { PaginationDto } from '../dto/pagination.dto'; // Import the correct file path for the PaginationDto class
import { ParseIntPipe } from '@nestjs/common'; // Import the ParseIntPipe
import { UserService } from 'src/api/user/services/user.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService
  ) { }

  @Get(':id')
  async getProduct(@Param() product: FindOneParams) {
    return this.productService.getProduct(product.id);
  }

  @Get()
  async getAllProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const paginationDto: PaginationDto = {
      page: page || 1,
      limit: limit || 10,
    };

    return this.productService.getAllProducts(paginationDto);
  }

  @Post('create')
  async createProduct(
    @Body() body: CreateProductDto,
    @CurrentUser() user: User,
  ) {
    const currentUser = await this.userService.findByEmail('test@gmail.com');

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    return this.productService.createProduct(body, currentUser.id);
  }

  @Auth(RoleIds.Admin, RoleIds.Merchant)
  @Post(':id/details')
  async addProductDetails(
    @Param() product: FindOneParams,
    @Body() body: ProductDetailsDto,
    @CurrentUser() user: User,
  ) {
    return this.productService.addProductDetails(product.id, body, user.id);
  }

  @Auth(RoleIds.Admin, RoleIds.Merchant)
  @Post(':id/activate')
  async activateProduct(
    @Param() product: FindOneParams,
    @CurrentUser() user: User,
  ) {
    return this.productService.activateProduct(product.id, user.id);
  }

  @Auth(RoleIds.Admin, RoleIds.Merchant)
  @Delete(':id')
  async deleteProduct(
    @Param() product: FindOneParams,
    @CurrentUser() user: User,
  ) {
    return this.productService.deleteProduct(product.id, user.id);
  }
}
