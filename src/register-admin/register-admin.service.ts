import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/register-admin.entity';
import { registerAdminDto } from './dto/create-register-admin.dto';
import { Role } from 'src/register-admin/role.enum';

@Injectable()
export class RegisterAdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async registerAdmin(registerAdminDto: registerAdminDto) {
    const admin = await this.adminRepository.create(registerAdminDto);
    return await this.adminRepository.save(admin);
  }

  async getAllAdmin(): Promise<Admin[]> {
    const admins = await this.adminRepository.find();
    try {
      return admins;
    } catch (error) {
      throw new NotFoundException('The admin list is empty for now.');
    }
  }

  async getAdminById(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    try {
      return admin;
    } catch (error) {
      throw new NotFoundException('Result not found!!.');
    }
  }

  async updateAmin(
    id: number,
    updateAdminDto: registerAdminDto,
  ): Promise<Admin> {
    const adminToUpdate = await this.adminRepository.findOne({ where: { id } });
    if (!adminToUpdate) {
      throw new Error('Admin not found.');
    }

    // Update the fields from the DTO
    Object.assign(adminToUpdate, updateAdminDto);
    return this.adminRepository.save(adminToUpdate);
  }

  async deleteAdmin(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }

  async findUser(email: string): Promise<Admin> {
    const user = await this.adminRepository.findOne({ where: { email } });
    return user;
  }

  async createDefaultSuperAdmin() {
    const existingSuperAdmin = await this.adminRepository.findOne({
      where: { email: 'hamzamuhd@gmail.com' },
    });

    if (!existingSuperAdmin) {
      const superAdminData: registerAdminDto = {
        first_name: 'Hamza',
        last_name: 'Muhd',
        email: 'hamzamuhd@gmail.com',
        phone_number: '09030007070',
        password: 'Hamza123',
        image: 'image',
        role: [Role.Super],
      };

      const superAdmin = this.adminRepository.create(superAdminData);
      await this.adminRepository.save(superAdmin);
    }
  }
}
