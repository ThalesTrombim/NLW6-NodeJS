import { Request, Response } from 'express';
import { ListUserSenderComplimentsService } from '../services/ListUserSenderComplimentsService';

class ListUserSendComplimentsController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;
 
        const listUserReceiveComplimentsService = new ListUserSenderComplimentsService();

        const compliments = await listUserReceiveComplimentsService.execute(user_id);

        return res.json(compliments);
    }
}

export { ListUserSendComplimentsController };