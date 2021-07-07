import { getCustomRepository } from "typeorm";
import { TagsRepositories } from '../repositories/TagsRepositories';
import { classToPlain } from 'class-transformer';

class ListTagService {

    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        const tag = await tagsRepositories.find();

        return classToPlain(tag);
    }
}

export { ListTagService };