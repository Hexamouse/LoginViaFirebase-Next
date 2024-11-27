import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { username } = req.query;

    const users = JSON.parse(fs.readFileSync(path.resolve('data/users.json')));
    const user = users.find(u => u.username === username);

    if (user) {
        const scheduleFile = path.resolve('data', user.schedule);
        const schedule = JSON.parse(fs.readFileSync(scheduleFile));

        res.status(200).json(schedule);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}
