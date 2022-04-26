import { EntityRepository, Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userData: User) {
    const newUser = this.create(userData);
    newUser.password = hashSync(userData.password, genSaltSync());

    if (await this.checkDuplicate(userData.email)) return;

    console.log(newUser);
    return await this.save(newUser);
  }

  async checkDuplicate(email: string) {
    const checkDuplicate = await this.findOne({ email });
    if (checkDuplicate) return true;
    return false;
  }

  async findAll() {
    const [users, itemCount] = await this.findAndCount();
    return { users, itemCount };
  }

  async updateUser(id: string, user: Partial<User>) {
    const updateUser = await this.findOne(id);
    if (!updateUser) return;

    return await this.save({ ...user, id });
  }

  async removeUser(id: string) {
    const updateUser = await this.findOne(id);
    if (!updateUser) return;

    return await this.remove(updateUser);
  }
}
