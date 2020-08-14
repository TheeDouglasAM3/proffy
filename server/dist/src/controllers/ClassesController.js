"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const convertHourToMinutes_1 = __importDefault(require("../utils/convertHourToMinutes"));
class ClassesController {
    async index(request, response) {
        const filters = request.query;
        const subject = filters.subject;
        const week_day = filters.week_day;
        const time = filters.time;
        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(404).json({
                error: 'Missing filter to search classes'
            });
        }
        const timeInMinutes = convertHourToMinutes_1.default(time);
        const classes = await connection_1.default('classes')
            .whereExists(function () {
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('class_schedule.class_id = classes.id')
                .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
                .whereRaw('class_schedule.from <= ??', [timeInMinutes])
                .whereRaw('class_schedule.to > ??', [timeInMinutes]);
        })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);
        return response.json(classes);
    }
    async store(request, response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;
        const trx = await connection_1.default.transaction();
        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            }).returning('id');
            const user_id = insertedUsersIds[0];
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            }).returning('id');
            const class_id = insertedClassesIds[0];
            const classSchedule = schedule.map((scheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes_1.default(scheduleItem.from),
                    to: convertHourToMinutes_1.default(scheduleItem.to),
                };
            });
            await trx('class_schedule').insert(classSchedule);
            await trx.commit();
            return response.status(201).send();
        }
        catch (error) {
            await trx.rollback();
            return response.status(404).json({
                error: 'Unexpected error while creating a new class :(('
            });
        }
    }
}
exports.default = ClassesController;
